import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const getFirebaseConfig = () => {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  return { projectId, clientEmail, privateKey };
};

export const isFirebaseConfigured = () => Boolean(getFirebaseConfig());

export const getDb = () => {
  const config = getFirebaseConfig();

  if (!config) {
    throw new Error(
      'Firebase nao configurado. Defina FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY.',
    );
  }

  const app =
    getApps()[0] ||
    initializeApp({
      credential: cert(config),
    });

  return getFirestore(app);
};
