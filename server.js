import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001; // Usaremos uma porta diferente para o backend

// --- Credenciais e Chave Secreta do .env ---
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-development';



// __dirname não existe em módulos ES, então precisamos dessa gambiarra
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'public', 'data');

app.use(cors()); // Permite a comunicação entre o front e o back
app.use(express.json({ limit: '10mb' })); // Permite que o servidor entenda JSON

// --- Rota de Login ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    // Gera um token que expira em 8 horas
    const token = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '8h' });
    return res.json({ message: 'Login bem-sucedido!', token });
  }

  return res.status(401).json({ message: 'Credenciais inválidas' });
});

// --- Middleware de Verificação de Token ---
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

  if (!token) {
    return res.status(403).json({ message: 'Um token é necessário para a autenticação.' });
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
  return next();
};

// Rota para LER todos os dados de uma entidade (ex: /api/products)
app.get('/api/:entity', async (req, res) => {
  const { entity } = req.params;
  const filePath = path.join(dataDir, `${entity}.json`);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error(`Erro ao ler o arquivo ${entity}.json:`, error);
    // Se o arquivo não existir, retorna um array vazio, como esperado pelo frontend
    if (error.code === 'ENOENT') {
      return res.json([]);
    }
    res.status(500).json({ message: `Erro ao buscar dados para ${entity}` });
  }
});

// Rota para SALVAR/ATUALIZAR todos os dados de uma entidade
app.post('/api/:entity', verifyToken, async (req, res) => { // <-- Middleware adicionado aqui
  const { entity } = req.params;
  const filePath = path.join(dataDir, `${entity}.json`);
  const content = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Corpo da requisição está vazio.' });
  }

  try {
    // Escreve os dados no arquivo .json, formatando para ficar legível
    await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf-8');
    res.json({ message: `${entity} atualizado com sucesso!` });
  } catch (error) {
    console.error(`Erro ao salvar o arquivo ${entity}.json:`, error);
    res.status(500).json({ message: `Erro ao salvar dados para ${entity}` });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor da API rodando em http://localhost:${PORT}`);
});