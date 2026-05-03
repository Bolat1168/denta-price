import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const STATS_FILE = path.join(process.cwd(), 'data', 'stats.json');

async function readStats() {
  try {
    const data = await fs.readFile(STATS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { views: [] };
  }
}

async function writeStats(stats: any) {
  await fs.writeFile(STATS_FILE, JSON.stringify(stats, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dentistId, serviceId, radiusKm, segment, source } = body;

    if (!dentistId || !serviceId || !radiusKm || !segment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const stats = await readStats();
    
    stats.views.push({
      dentistId,
      serviceId,
      radiusKm,
      segment,
      source: source === 'whatsapp' ? 'whatsapp' : 'view',
      timestamp: Date.now(),
      date: new Date().toISOString()
    });

    // Оставляем последние 50000 записей
    if (stats.views.length > 50000) {
      stats.views = stats.views.slice(-50000);
    }

    await writeStats(stats);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error recording view:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
