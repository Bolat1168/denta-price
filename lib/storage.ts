import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';

const isLocal = process.env.NODE_ENV === 'development';
const FILE_PATH = path.join(process.cwd(), 'data-src', 'dentists.json');

let redis: Redis | null = null;

if (!isLocal) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
  });
}

export async function getDentists(): Promise<any[]> {
  if (isLocal) {
    try {
      const data = fs.readFileSync(FILE_PATH, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  
  if (!redis) return [];
  const dentists = await redis.get('dentists');
  return (dentists as any[]) || [];
}

export async function saveDentists(dentists: any[]): Promise<void> {
  if (isLocal) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(dentists, null, 2));
    return;
  }
  
  if (!redis) return;
  await redis.set('dentists', dentists);
}

export async function getDentistById(id: string): Promise<any | null> {
  const dentists = await getDentists();
  return dentists.find((d: any) => d.id === id) || null;
}

export async function updateDentist(id: string, data: any): Promise<boolean> {
  const dentists = await getDentists();
  const index = dentists.findIndex((d: any) => d.id === id);
  
  if (index === -1) return false;
  
  dentists[index] = { ...dentists[index], ...data };
  await saveDentists(dentists);
  return true;
}