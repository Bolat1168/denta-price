const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccount = require('../perceptive-ivy-435106-h6-firebase-adminsdk-fbsvc-635036af10.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Загружаем маппинг service_id_map.json
const mapPath = path.join(__dirname, '../service_id_map.json');
const mapData = fs.readFileSync(mapPath, 'utf8');
const serviceMap = JSON.parse(mapData);

// Строим маппинг из русского названия в короткий ID
const nameToShortId = {};
serviceMap.forEach(item => {
  nameToShortId[item.serviceNameRU] = item.serviceId;
});

async function loadBenchmarks() {
  try {
    const pricesPath = path.join(__dirname, '../service_prices_almaty.json');
    const pricesData = fs.readFileSync(pricesPath, 'utf8');
    const prices = JSON.parse(pricesData);

    console.log(`Найдено услуг: ${prices.length}`);

    const batch = db.batch();
    prices.forEach((item) => {
      const shortId = nameToShortId[item.serviceNameRU];
      if (!shortId) {
        console.warn(`Не найден короткий ID для услуги: ${item.serviceNameRU}, пропускаем`);
        return;
      }
      const docRef = db.collection('benchmarkPrices').doc(shortId);
      batch.set(docRef, {
        category: item.category || '',
        serviceNameRU: item.serviceNameRU || '',
        serviceNameKZ: item.serviceNameKZ || '',
        econom: item.econom || 0,
        comfort: item.comfort || 0,
        optimum: item.optimum || 0,
        premium: item.premium || 0,
        luxury: item.luxury || 0,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    await batch.commit();
    console.log('✅ Все цены успешно загружены в Firestore!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка при загрузке:', error);
    process.exit(1);
  }
}

loadBenchmarks();