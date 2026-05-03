const admin = require('firebase-admin');

// ВСТАВЬТЕ СВОИ ЗНАЧЕНИЯ ИЗ VERCEL
const config = {
  projectId: "ВСТАВЬТЕ_СЮДА_FIREBASE_PROJECT_ID",
  clientEmail: "ВСТАВЬТЕ_СЮДА_FIREBASE_CLIENT_EMAIL",
  privateKey: "ВСТАВЬТЕ_СЮДА_FIREBASE_PRIVATE_KEY".replace(/\\n/g, '\n')
};

async function test() {
  console.log('=== ЛОКАЛЬНАЯ ПРОВЕРКА ===');
  console.log('Project ID:', config.projectId);
  console.log('Client Email:', config.clientEmail);
  console.log('Key length:', config.privateKey.length);

  try {
    admin.initializeApp({ credential: admin.credential.cert(config) });
    const db = admin.firestore();
    
    const snapshot = await db.collection('settings').limit(1).get();
    console.log('✅ УСПЕШНО! Firebase работает локально');
    process.exit(0);
  } catch (error) {
    console.error('❌ ОШИБКА:', error.message);
    console.log('Ключ недействителен. Нужно создать новый в Firebase Console');
    process.exit(1);
  }
}

test();