import { getFirestore } from 'firebase-admin/firestore';
import { cert, getApps, initializeApp } from 'firebase-admin/app';

if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_KEY || '{}')),
  });
}

const db = getFirestore();

export async function benchmarkPrices() {
  try {
    const snapshot = await db.collection('prices').get();
    const prices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: prices };
  } catch (error) {
    console.error('benchmarkPrices error:', error);
    return { success: false, error: String(error) };
  }
}