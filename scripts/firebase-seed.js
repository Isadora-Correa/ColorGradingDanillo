import { config } from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDb, isFirebaseConfigured } from '../api/firebaseAdmin.js';

config({ override: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const entities = [
  'settings',
  'products',
  'courseContent',
  'modules',
  'students',
  'logos',
  'testimonials',
  'faqs',
  'beforeAfter',
];

const run = async () => {
  if (!isFirebaseConfigured()) {
    throw new Error(
      'Firebase nao configurado. Preencha FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY no .env.',
    );
  }

  const db = getDb();

  for (const entity of entities) {
    const filePath = path.join(rootDir, `${entity}.json`);
    const payload = JSON.parse(readFileSync(filePath, 'utf8'));

    await db.collection('siteContent').doc(entity).set(
      {
        payload,
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );

    console.log(`Colecao "${entity}" enviada para o Firestore.`);
  }
};

run().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
