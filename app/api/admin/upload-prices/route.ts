import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { upsertBenchmarkPrice } from '../../../../lib/firebase/benchmarkPrices';
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs/promises';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions)) as any;
  
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

  const mapPath = path.join(process.cwd(), 'data-src', 'service_id_map.json');
  const mapContent = await fs.readFile(mapPath, 'utf-8');
  const serviceMap: Array<{ serviceNameRU: string; serviceId: string }> = JSON.parse(mapContent);
  const nameToId: Record<string, string> = {};
  serviceMap.forEach(item => { nameToId[item.serviceNameRU] = item.serviceId; });

  const extractNumber = (val: any): number | null => {
    if (!val) return null;
    const str = String(val);
    const match = str.match(/(\d[\d\s]*)/g);
    if (match) {
      const nums = match.map(s => parseInt(s.replace(/\s/g, '')));
      return nums[nums.length - 1];
    }
    return null;
  };

  const results = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row[1]) continue;
    const serviceName = row[1]?.toString().trim();
    const serviceId = nameToId[serviceName];
    if (!serviceId) continue;

    const econom = extractNumber(row[4]);
    const comfort = extractNumber(row[5]);
    const optimum = extractNumber(row[6]);
    const premium = extractNumber(row[7]);
    const luxury = extractNumber(row[8]);

    if (econom === null || comfort === null || optimum === null || premium === null || luxury === null) continue;

    await upsertBenchmarkPrice({
      serviceId,
      category: row[0]?.toString() || '',
      serviceNameRU: serviceName,
      econom,
      comfort,
      optimum,
      premium,
      luxury,
    });
    results.push({ serviceId, serviceName, updated: true });
  }
  return NextResponse.json({ success: true, updated: results.length });
}
