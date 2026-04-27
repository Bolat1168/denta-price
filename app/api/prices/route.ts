import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const pricingDir = path.join(process.cwd(), 'pricing');
    
    const almatyPath = path.join(pricingDir, 'almaty-prices.json');
    const almatyPrices = JSON.parse(await fs.readFile(almatyPath, 'utf-8'));
    
    const promoPath = path.join(pricingDir, 'promotion-prices.json');
    const promotionPrices = JSON.parse(await fs.readFile(promoPath, 'utf-8'));

    return NextResponse.json({ almatyPrices, promotionPrices });
  } catch (error) {
    console.error('API /api/prices error:', error);
    return NextResponse.json({ error: 'Failed to load prices' }, { status: 500 });
  }
}