import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const rawKey = process.env.FIREBASE_PRIVATE_KEY;
    
    if (rawKey) {
      // Очистка ключа от кавычек, лишних пробелов и восстановление переносов строк
      const formattedKey = rawKey
        .replace(/\\n/g, '\n')
        .replace(/"/g, '')
        .trim();
      
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: formattedKey,
        }),
      });
    } else {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }
  } catch (error) {
    console.error('Firebase Init Error:', error);
  }
}

export const db = admin.firestore();
export const auth = admin.auth();
export default admin;