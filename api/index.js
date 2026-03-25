import { readFileSync, existsSync } from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Configuração de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { slug } = req.query;

  try {
    // Definimos o caminho absoluto de forma que a Vercel entenda
    const filePath = path.join(process.cwd(), `${slug}.json`);

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