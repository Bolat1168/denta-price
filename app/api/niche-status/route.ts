import { NextResponse } from 'next/server';
import { getDisplacementCount } from '@/lib/firebase/promotions';
import { Timestamp } from 'firebase-admin/firestore';

// Множители для разных радиусов (от цены услуги)
const RADIUS_MULTIPLIERS: Record<string, number> = {
  '1': 0.032,   // 3.2% для 1 км
  '3': 0.048,   // 4.8% для 3 км
  '6': 0.064,   // 6.4% для 6 км
  'city': 0.08, // 8% для города
};

// Множители для статусов (вытеснения)
const MULTIPLIERS = {
  green: 1.0,   // 0 вытеснений
  yellow: 1.1,  // 1 вытеснение
  red: 1.3,     // 2+ вытеснений
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get('serviceId');
  const segment = searchParams.get('segment');
  const radiusParam = searchParams.get('radius');
  const priceParam = searchParams.get('price');

  if (!serviceId || !segment || !radiusParam || !priceParam) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const price = parseFloat(priceParam);
  if (isNaN(price) || price <= 0) {
    return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
  }

  let radius: number | 'city';
  if (radiusParam === 'city') {
    radius = 'city';
  } else {
    radius = parseInt(radiusParam, 10);
    if (isNaN(radius)) {
      return NextResponse.json({ error: 'Invalid radius' }, { status: 400 });
    }
  }

  try {
    const radiusKey = String(radius);
    const radiusMultiplier = RADIUS_MULTIPLIERS[radiusKey] || 0.08;
    const baseRate = Math.round(price * radiusMultiplier);
    const displacementCount = await getDisplacementCount(serviceId, segment, radius, 15);

    if (displacementCount === 0) {
      return NextResponse.json({ status: 'green', price: baseRate });
    } else if (displacementCount === 1) {
      return NextResponse.json({ status: 'yellow', price: Math.round(baseRate * MULTIPLIERS.yellow) });
    } else {
      return NextResponse.json({ status: 'red', price: Math.round(baseRate * MULTIPLIERS.red) });
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}