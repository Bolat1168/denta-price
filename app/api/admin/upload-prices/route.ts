import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { benchmarkPrices } from '@/lib/firebase/benchmarkPrices';
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const result = await benchmarkPrices();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload prices' }, { status: 500 });
  }
}
