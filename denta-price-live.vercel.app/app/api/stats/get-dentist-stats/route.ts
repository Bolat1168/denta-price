import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const STATS_FILE = path.join(process.cwd(), 'data', 'stats.json');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dentistId = searchParams.get('dentistId');

  if (!dentistId) {
    return NextResponse.json({ error: 'dentistId required' }, { status: 400 });
  }

  try {
    const data = await fs.readFile(STATS_FILE, 'utf-8');
    const stats = JSON.parse(data);
    
    const dentistViews = stats.views.filter((v: any) => v.dentistId === dentistId);
    
    const byService: Record<string, { 
      views1km: number; 
      views3km: number; 
      views6km: number; 
      viewsCity: number; 
      whatsappClicks: number;
      totalViews: number;
    }> = {};
    
    for (const view of dentistViews) {
      if (!byService[view.serviceId]) {
        byService[view.serviceId] = { 
          views1km: 0, 
          views3km: 0, 
          views6km: 0, 
          viewsCity: 0, 
          whatsappClicks: 0,
          totalViews: 0
        };
      }
      
      const radiusKey = view.radiusKm === 1 ? 'views1km' :
                        view.radiusKm === 3 ? 'views3km' :
                        view.radiusKm === 6 ? 'views6km' : 'viewsCity';
      
      byService[view.serviceId][radiusKey]++;
      byService[view.serviceId].totalViews++;
      
      if (view.source === 'whatsapp') {
        byService[view.serviceId].whatsappClicks++;
      }
    }
    
    // Добавляем услуги, у которых нет просмотров, но они есть в профиле дантиста
    const dentists = await fs.readFile(path.join(process.cwd(), 'data-src', 'dentists.json'), 'utf-8').catch(() => '[]');
    const dentistsData = JSON.parse(dentists);
    const dentist = dentistsData.find((d: any) => d.id === dentistId);
    
    if (dentist && dentist.services) {
      for (const service of dentist.services) {
        if (!byService[service.serviceId]) {
          byService[service.serviceId] = {
            views1km: 0,
            views3km: 0,
            views6km: 0,
            viewsCity: 0,
            whatsappClicks: 0,
            totalViews: 0
          };
        }
      }
    }
    
    return NextResponse.json({ 
      success: true,
      byService, 
      totalViews: dentistViews.length,
      whatsappClicks: dentistViews.filter((v: any) => v.source === 'whatsapp').length
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    return NextResponse.json({ byService: {}, totalViews: 0, whatsappClicks: 0 });
  }
}
