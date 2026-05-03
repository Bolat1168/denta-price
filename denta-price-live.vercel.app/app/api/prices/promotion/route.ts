import { NextResponse } from 'next/server';

// Ставки продвижения: множители от цены услуги
// ля радиуса "город" (city) — 8% от цены услуги
// ля радиусов 1, 3, 6 км — 3.2%, 4.8%, 6.4% соответственно
const PROMOTION_MULTIPLIERS = {
  econom: {
    city: 0.08,
    1: 0.032,
    3: 0.048,
    6: 0.064,
  },
  comfort: {
    city: 0.08,
    1: 0.032,
    3: 0.048,
    6: 0.064,
  },
  optimum: {
    city: 0.08,
    1: 0.032,
    3: 0.048,
    6: 0.064,
  },
  premium: {
    city: 0.08,
    1: 0.032,
    3: 0.048,
    6: 0.064,
  },
  luxury: {
    city: 0.08,
    1: 0.032,
    3: 0.048,
    6: 0.064,
  },
};

export async function GET() {
  try {
    // озвращаем данные в формате, который ожидает loadPromotionPrices
    // loadPromotionPrices ожидает { multipliers: { [segment]: { [radius]: number } } }
    return NextResponse.json({
      multipliers: PROMOTION_MULTIPLIERS,
    });
  } catch (error) {
    console.error('Failed to load promotion prices:', error);
    return NextResponse.json(
      { error: 'Failed to load promotion prices' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';