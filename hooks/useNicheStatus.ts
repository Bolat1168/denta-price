import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { Promotion } from '@/lib/firebase/promotions';
import type { BenchmarkPrice } from '@/lib/firebase/benchmarkPrices';

const COEFFICIENTS = {
  GREEN: 1.0,   // свободная ниша (< 3 занято)
  YELLOW: 1.1,  // вытеснение (нет платежей >15 мин)
  RED: 1.3,     // активная борьба
};

export function useNicheStatus(
  serviceId: string,
  segment: string,
  radius: number,
  benchmark: BenchmarkPrice | null
) {
  const [status, setStatus] = useState<'green' | 'yellow' | 'red'>('green');
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serviceId || !segment || !benchmark) {
      setLoading(false);
      return;
    }

    const basePrice = benchmark[segment as keyof BenchmarkPrice] as number;
    if (!basePrice) {
      setLoading(false);
      return;
    }

    // Подписываемся на активные продвижения в нише
    const promotionsQuery = query(
      collection(db, 'promotions'),
      where('serviceId', '==', serviceId),
      where('segment', '==', segment),
      where('radius', '==', radius),
      where('isActive', '==', true),
      orderBy('paidAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(promotionsQuery, (snapshot) => {
      const activePromotions = snapshot.docs.map(doc => doc.data() as Promotion);
      const count = activePromotions.length;

      // Проверяем время последнего платежа
      let lastPaymentMinutesAgo = Infinity;
      if (activePromotions.length > 0) {
        const last = activePromotions[0];
        const now = Date.now();
        const lastTime = last.paidAt.toMillis();
        lastPaymentMinutesAgo = (now - lastTime) / 1000 / 60;
      }

      // Определяем статус
      if (count < 3) {
        setStatus('green');
        setPrice(basePrice * COEFFICIENTS.GREEN);
      } else if (lastPaymentMinutesAgo > 15) {
        setStatus('yellow');
        setPrice(basePrice * COEFFICIENTS.YELLOW);
      } else {
        setStatus('red');
        setPrice(basePrice * COEFFICIENTS.RED);
      }

      setLoading(false);
    }, (error) => {
      console.error('Error in niche status:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, [serviceId, segment, radius, benchmark]);

  return { status, price, loading };
}