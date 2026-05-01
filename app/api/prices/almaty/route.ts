import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'pricing', 'almaty-prices.json');
  if (!fs.existsSync(filePath)) {
    console.error('[API /prices/almaty] File not found:', filePath);
    return NextResponse.json([]);
  }
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const prices = JSON.parse(data);
    // Лог для o5 (для отладки)
    const o5 = prices.find((p: { serviceId: string }) => p.serviceId === 'o5');
    if (o5) console.log('[API] o5 data:', JSON.stringify(o5, null, 2));
    return NextResponse.json(prices);
  } catch (error) {
    console.error('[API /prices/almaty] Error:', error);
    return NextResponse.json([]);
  }
}
