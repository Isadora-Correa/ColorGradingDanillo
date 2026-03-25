import { readFileSync, existsSync } from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Cabeçalhos de segurança e CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { slug } = req.query;

  try {
    // A Vercel às vezes precisa do caminho absoluto assim:
    const baseDirectory = process.cwd();
    const filePath = path.join(baseDirectory, `${slug}.json`);

    console.log(`Tentando ler arquivo: ${filePath}`);

    if (existsSync(filePath)) {
      const fileContent = readFileSync(filePath, 'utf8');
      return res.status(200).json(JSON.parse(fileContent));
    }

    // Se o arquivo não existir, retorna array vazio em vez de erro 500
    return res.status(200).json([]);
  } catch (error) {
    // Se der erro, retorna array vazio e loga o erro (evita a tela de 500)
    console.error("Erro na Serverless Function:", error);
    return res.status(200).json([]); 
  }
}