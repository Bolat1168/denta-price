import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/client'; // клиентский Firebase
import { collection, onSnapshot, query } from 'firebase/firestore';
import type { BenchmarkPrice } from '@/lib/firebase/benchmarkPrices';

export function useBenchmarkPrices() {
  const [prices, setPrices] = useState<BenchmarkPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'benchmarkPrices'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as BenchmarkPrice);
      setPrices(data);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching benchmark prices:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { prices, loading };
}
