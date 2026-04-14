import { readFileSync, existsSync } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { getDb, isFirebaseConfigured } from './firebaseAdmin.js';

const READ_ONLY_MESSAGE =
  'Este deploy na Vercel e somente leitura. Para salvar alteracoes do admin, configure o Firebase Firestore e as credenciais do servidor.';

const verifyToken = (req) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const jwtSecret = process.env.JWT_SECRET;

  if (!token) {
    return { ok: false, status: 403, message: 'Um token e necessario para autenticacao.' };
  }

  if (!jwtSecret) {
    return {
      ok: false,
      status: 500,
      message: 'JWT_SECRET nao configurado no deploy.',
    };
  }

  try {
    jwt.verify(token, jwtSecret);
    return { ok: true };
  } catch {
    return { ok: false, status: 401, message: 'Token invalido ou expirado.' };
  }
};

const getFirestoreDoc = async (route) => {
  const db = getDb();
  const doc = await db.collection('siteContent').doc(route).get();

  if (!doc.exists) return null;

  const data = doc.data();
  return data?.payload ?? [];
};

const saveFirestoreDoc = async (route, payload) => {
  const db = getDb();

  await db.collection('siteContent').doc(route).set(
    {
      payload,
      updatedAt: new Date().toISOString(),
    },
    { merge: true },
  );
};

export default async function handler(req, res) {
  // Configuração de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { slug } = req.query;
  const route = Array.isArray(slug) ? slug.join('/') : slug;

  try {
    if (req.method === 'POST' && route === 'login') {
      const { username, password } = req.body || {};
      const adminUser = process.env.ADMIN_USER;
      const adminPassword = process.env.ADMIN_PASSWORD;
      const jwtSecret = process.env.JWT_SECRET;

      if (!adminUser || !adminPassword || !jwtSecret) {
        return res.status(500).json({
          message: 'Credenciais do admin nao configuradas no deploy.',
        });
      }

      if (username !== adminUser || password !== adminPassword) {
        return res.status(401).json({ message: 'Credenciais invalidas.' });
      }

      const token = jwt.sign({ username }, jwtSecret, { expiresIn: '8h' });
      return res.status(200).json({ message: 'Login bem-sucedido!', token });
    }

    if (req.method === 'POST') {
      const auth = verifyToken(req);
      if (!auth.ok) {
        return res.status(auth.status).json({ message: auth.message });
      }

      if (!route) {
        return res.status(400).json({ message: 'Entidade nao informada.' });
      }

      if (!isFirebaseConfigured()) {
        return res.status(501).json({ message: READ_ONLY_MESSAGE });
      }

      await saveFirestoreDoc(route, req.body ?? []);
      return res.status(200).json({ message: `${route} atualizado com sucesso!` });
    }

    if (!route) {
      return res.status(200).json([]);
    }

    if (isFirebaseConfigured()) {
      const firestoreData = await getFirestoreDoc(route);
      if (firestoreData !== null) {
        return res.status(200).json(firestoreData);
      }
    }

    // Fallback para leitura dos JSONs quando o Firebase ainda nao estiver configurado
    return res.status(200).json(readJsonFallback(route));
  } catch (error) {
    // Isso evita o erro 500. Se der qualquer erro, ele loga e manda um array vazio
    console.error("Erro na função:", error);
    if (req.method === 'POST') {
      return res.status(500).json({
        message: error?.message || 'Nao foi possivel salvar os dados.',
      });
    }
    return res.status(200).json([]); 
  }
}
