import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import nodemailer from 'nodemailer';

const CITIES = ['Almaty', 'Astana', 'Shymkent'] as const;
type City = typeof CITIES[number];

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const ADMIN_EMAIL = process.env.REPORT_EMAIL;

function getCity(d: any): City {
  const city = d.city || 'Almaty';
  if (city === 'Astana' || city === 'Shymkent') return city;
  return 'Almaty';
}

async function getYesterdayDate(): Promise<string> {
  const now = new Date();
  const almatyDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Almaty' }));
  almatyDate.setDate(almatyDate.getDate() - 1);
  return almatyDate.toISOString().split('T')[0];
}

export async function GET() {
  try {
    const dateStr = await getYesterdayDate();
    const dentistsSnapshot = await db.collection('dentists').get();
    const allDentists = dentistsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
    const slotsSnapshot = await db.collection('slots').where('date', '==', dateStr).get();
    const slotsByDentist: Record<string, any[]> = {};
    slotsSnapshot.forEach(doc => {
      const data = doc.data();
      const dentistId = data.dentistId;
      if (!dentistId) return;
      if (!slotsByDentist[dentistId]) slotsByDentist[dentistId] = [];
      slotsByDentist[dentistId].push(data);
    });
    const reports: Record<City, any> = {
      Almaty: { registered: 0, active: 0, slots: 0, paidSlots: 0, freeSlots: 0, views: 0, whatsapp: 0, dentists: [] },
      Astana: { registered: 0, active: 0, slots: 0, paidSlots: 0, freeSlots: 0, views: 0, whatsapp: 0, dentists: [] },
      Shymkent: { registered: 0, active: 0, slots: 0, paidSlots: 0, freeSlots: 0, views: 0, whatsapp: 0, dentists: [] },
    };
    for (const d of allDentists) {
      const city = getCity(d);
      const r = reports[city];
      r.registered++;
      const services = d.services || [];
      const activeServices = services.filter((s: any) => s.isPaid && s.activeFrom);
      if (activeServices.length > 0) r.active++;
      const dentistSlots = slotsByDentist[d.id] || [];
      const paidSlots = dentistSlots.filter((s: any) => s.isPaid || (s.price && s.price > 0)).length;
      const freeSlots = dentistSlots.length - paidSlots;
      const totalViews = services.reduce((sum: number, s: any) => sum + (s.views1km || 0) + (s.views3km || 0) + (s.views6km || 0) + (s.viewsCity || 0), 0);
      const totalWhatsapp = services.reduce((sum: number, s: any) => sum + (s.whatsappClicks || 0), 0);
      r.slots += dentistSlots.length;
      r.paidSlots += paidSlots;
      r.freeSlots += freeSlots;
      r.views += totalViews;
      r.whatsapp += totalWhatsapp;
      r.dentists.push({
        name: d.fullName || d.name || d.id,
        email: d.email || 'no email',
        slots: dentistSlots.length,
        paidSlots, freeSlots, views: totalViews, whatsappClicks: totalWhatsapp,
      });
    }
    let html = `<h1>Daily Report for ${dateStr}</h1>`;
    for (const city of CITIES) {
      const r = reports[city];
      html += `<h2>=== ${city.toUpperCase()} ===</h2>`;
      html += `<p>Registered dentists: ${r.registered}</p>`;
      html += `<p>Active dentists: ${r.active}</p>`;
      html += `<p>Total slots: ${r.slots} (paid: ${r.paidSlots}, free: ${r.freeSlots})</p>`;
      html += `<p>Total views: ${r.views}</p>`;
      html += `<p>Total WhatsApp clicks: ${r.whatsapp}</p>`;
      if (r.dentists.length) {
        html += `<ul>`;
        for (const d of r.dentists) {
          html += `<li><strong>${d.name}</strong> (${d.email}): ${d.slots} slots (${d.paidSlots} paid), views: ${d.views}, whatsapp: ${d.whatsappClicks}</li>`;
        }
        html += `</ul>`;
      }
    }
    const totalRegistered = reports.Almaty.registered + reports.Astana.registered + reports.Shymkent.registered;
    const totalActive = reports.Almaty.active + reports.Astana.active + reports.Shymkent.active;
    const totalSlots = reports.Almaty.slots + reports.Astana.slots + reports.Shymkent.slots;
    const totalPaid = reports.Almaty.paidSlots + reports.Astana.paidSlots + reports.Shymkent.paidSlots;
    const totalViews = reports.Almaty.views + reports.Astana.views + reports.Shymkent.views;
    const totalWhatsapp = reports.Almaty.whatsapp + reports.Astana.whatsapp + reports.Shymkent.whatsapp;
    html += `<h2>=== SUMMARY ===</h2>`;
    html += `<p>Total registered: ${totalRegistered}</p>`;
    html += `<p>Total active: ${totalActive}</p>`;
    html += `<p>Total slots: ${totalSlots} (paid: ${totalPaid}, free: ${totalSlots - totalPaid})</p>`;
    html += `<p>Total views: ${totalViews}</p>`;
    html += `<p>Total WhatsApp clicks: ${totalWhatsapp}</p>`;
    html += `<p><em>Report generated at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Almaty' })}</em></p>`;
    if (ADMIN_EMAIL && SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"Denta Report" <${SMTP_USER}>`,
        to: ADMIN_EMAIL,
        subject: `Daily Report ${dateStr}`,
        html,
      });
      console.log(`Report sent to ${ADMIN_EMAIL}`);
    }
    return NextResponse.json({ success: true, date: dateStr, reports });
  } catch (error) {
    console.error('Report generation failed:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}