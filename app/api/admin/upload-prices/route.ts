import { NextResponse } from 'next/server';
import { authenticate } from '../../../../lib/auth';
import { benchmarkPrices } from '../../../../lib/firebase/benchmarkPrices';

export async function POST() {
  await authenticate();
  const result = await benchmarkPrices();
  return NextResponse.json(result);
}