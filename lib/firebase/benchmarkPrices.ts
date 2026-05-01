import { db } from '@/lib/firebaseadmin';
import { Timestamp } from 'firebase-admin/firestore';

export interface BenchmarkPrice {
  serviceId: string;
  category: string;
  serviceNameRU: string;
  serviceNameKZ?: string;
  econom: number;
  comfort: number;
  optimum: number;
  premium: number;
  luxury: number;
  updatedAt: Timestamp;
}

const BENCHMARK_COLLECTION = 'benchmarkPrices';

export async function upsertBenchmarkPrice(data: Omit<BenchmarkPrice, 'updatedAt'>) {
  const ref = db.collection(BENCHMARK_COLLECTION).doc(data.serviceId);
  await ref.set({
    ...data,
    updatedAt: Timestamp.now(),
  }, { merge: true });
}

export async function getBenchmarkPrice(serviceId: string): Promise<BenchmarkPrice | null> {
  const doc = await db.collection(BENCHMARK_COLLECTION).doc(serviceId).get();
  return doc.exists ? (doc.data() as BenchmarkPrice) : null;
}

export async function getAllBenchmarkPrices(): Promise<BenchmarkPrice[]> {
  const snapshot = await db.collection(BENCHMARK_COLLECTION).get();
  return snapshot.docs.map(doc => doc.data() as BenchmarkPrice);
}

