const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { slug } = req.query;

  try {
    // Tenta ler o arquivo JSON correspondente na raiz (ex: products.json)
    const filePath = path.join(process.cwd(), `${slug}.json`);
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return res.status(200).json(JSON.parse(fileContent));
    }

    // Fallback caso o arquivo não exista
    return res.status(200).json([]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao ler dados" });
  }
}