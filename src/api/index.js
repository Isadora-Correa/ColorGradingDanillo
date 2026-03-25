// api/index.js
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { slug } = req.query;

  const database = {
    // IMPORTANTE: Use sempre [] para listas
    settings: { title: "Nava Colorist" },
    products: [
      { id: '1', name: "Curso Color Grading", price: 299.99 },
      { id: '2', name: "LUTS Pack", price: 39.00 }
    ],
    students: [],
    courseContent: [],
    modules: [],
    logos: [],
    testimonials: [],
    faqs: [],
    beforeAfter: []
  };

  // Se o slug (ex: products) existir no database, retorna ele.
  // SE NÃO EXISTIR, retorna uma array vazia [] para não quebrar o .find() ou .map()
  const data = database[slug] || []; 

  return res.status(200).json(data);
}