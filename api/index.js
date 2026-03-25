import { readFileSync, existsSync } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
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
      return res.status(501).json({
        message:
          'Este deploy na Vercel e somente leitura. Para salvar alteracoes do admin, use um backend Node com persistencia.',
      });
    }

    // Definimos o caminho absoluto de forma que a Vercel entenda
    const filePath = path.join(process.cwd(), `${route}.json`);

    if (existsSync(filePath)) {
      const fileContent = readFileSync(filePath, 'utf8');
      return res.status(200).json(JSON.parse(fileContent));
    }

    // Se o arquivo não existir, retornamos [] para o React não quebrar
    return res.status(200).json([]);
  } catch (error) {
    // Isso evita o erro 500. Se der qualquer erro, ele loga e manda um array vazio
    console.error("Erro na função:", error);
    return res.status(200).json([]); 
  }
}
