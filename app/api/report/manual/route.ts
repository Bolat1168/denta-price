import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const ADMIN_EMAIL = process.env.REPORT_EMAIL;

interface DentistData {
  id: string;
  fullName?: string;
  name?: string;
  email?: string;
  whatsapp?: string;
  phone?: string;
  city?: string;
  services?: any[];
}

function getCity(d: DentistData): string {
  const city = d.city || 'Almaty';
  if (city === 'Astana' || city === 'Shymkent') return city;
  return 'Almaty';
}

export async function GET() {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];

    const dentistsSnapshot = await db.collection('dentists').get();
    const allDentists: DentistData[] = dentistsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const slotsSnapshot = await db.collection('slots').where('date', '==', dateStr).get();
    const slotsByDentist: Record<string, any[]> = {};
    slotsSnapshot.forEach(doc => {
      const data = doc.data();
      const dentistId = data.dentistId;
      if (!dentistId) return;
      if (!slotsByDentist[dentistId]) slotsByDentist[dentistId] = [];
      slotsByDentist[dentistId].push(data);
    });

    const cities = ['Almaty', 'Astana', 'Shymkent'];
    const reports: Record<string, any> = {
      Almaty: { registered: 0, active: 0, slots: 0, paidSlots: 0, freeSlots: 0, occupiedSlots: 0, freeOccupiedSlots: 0, paidOccupiedSlots: 0, views: 0, whatsapp: 0, dentists: [] },
      Astana: { registered: 0, active: 0, slots: 0, paidSlots: 0, freeSlots: 0, occupiedSlots: 0, freeOccupiedSlots: 0, paidOccupiedSlots: 0, views: 0, whatsapp: 0, dentists: [] },
      Shymkent: { registered: 0, active: 0, slots: 0, paidSlots: 0, freeSlots: 0, occupiedSlots: 0, freeOccupiedSlots: 0, paidOccupiedSlots: 0, views: 0, whatsapp: 0, dentists: [] },
    };

    for (const d of allDentists) {
      const city = getCity(d);
      const r = reports[city];
      r.registered++;

      const services = d.services || [];
      const activeServices = services.filter((s: any) => s.isPaid && s.activeFrom);
      if (activeServices.length > 0) r.active++;

      const dentistSlots = slotsByDentist[d.id] || [];
      const paidSlots = dentistSlots.filter((s: any) => s.isPaid === true).length;
      const freeSlots = dentistSlots.filter((s: any) => s.isPaid === false).length;
      const occupiedSlots = dentistSlots.filter((s: any) => s.status === 'occupied').length;
      const freeOccupiedSlots = dentistSlots.filter((s: any) => s.status === 'occupied' && s.isPaid === false).length;
      const paidOccupiedSlots = dentistSlots.filter((s: any) => s.status === 'occupied' && s.isPaid === true).length;

      const totalViews = services.reduce((sum: number, s: any) => sum + (s.views1km || 0) + (s.views3km || 0) + (s.views6km || 0) + (s.viewsCity || 0), 0);
      const totalWhatsapp = services.reduce((sum: number, s: any) => sum + (s.whatsappClicks || 0), 0);

      r.slots += dentistSlots.length;
      r.paidSlots += paidSlots;
      r.freeSlots += freeSlots;
      r.occupiedSlots += occupiedSlots;
      r.freeOccupiedSlots += freeOccupiedSlots;
      r.paidOccupiedSlots += paidOccupiedSlots;
      r.views += totalViews;
      r.whatsapp += totalWhatsapp;

      r.dentists.push({
        name: d.fullName || d.name || d.id,
        email: d.email || 'no email',
        whatsapp: d.whatsapp || d.phone || 'no phone',
        slots: dentistSlots.length,
        paidSlots,
        freeSlots,
        occupiedSlots,
        freeOccupiedSlots,
        paidOccupiedSlots,
        views: totalViews,
        whatsappClicks: totalWhatsapp,
      });
    }

    let html = '<h1>Daily Report for ' + dateStr + '</h1>';
    for (const city of cities) {
      const r = reports[city];
      html += '<h2>' + city.toUpperCase() + '</h2>';
      
      html += '<table border=\"1\" cellpadding=\"5\" cellspacing=\"0\" style=\"border-collapse: collapse;\">';
      html += '<tr><th>Registered</th><th>Active</th><th>Total slots</th><th>Paid slots</th><th>Free slots</th><th>Occupied slots</th><th>Occupied paid</th><th>Occupied free</th><th>Views</th><th>WhatsApp clicks</th></tr>';
      html += '<tr>';
      html += '<td>' + r.registered + '</td>';
      html += '<td>' + r.active + '</td>';
      html += '<td>' + r.slots + '</td>';
      html += '<td>' + r.paidSlots + '</td>';
      html += '<td>' + r.freeSlots + '</td>';
      html += '<td>' + r.occupiedSlots + '</td>';
      html += '<td>' + r.paidOccupiedSlots + '</td>';
      html += '<td>' + r.freeOccupiedSlots + '</td>';
      html += '<td>' + r.views + '</td>';
      html += '<td>' + r.whatsapp + '</td>';
      html += '</tr>';
      html += '</table><br>';

      if (r.dentists.length > 0) {
        html += '<h3>Dentists</h3>';
        html += '<table border=\"1\" cellpadding=\"5\" cellspacing=\"0\" style=\"border-collapse: collapse;\">';
        html += '<tr><th>Name</th><th>Email</th><th>WhatsApp</th><th>Slots</th><th>Paid</th><th>Free</th><th>Occupied</th><th>Occupied paid</th><th>Occupied free</th><th>Views</th><th>WhatsApp clicks</th></tr>';
        for (const d of r.dentists) {
          html += '<tr>';
          html += '<td>' + d.name + '</td>';
          html += '<td>' + d.email + '</td>';
          html += '<td>' + d.whatsapp + '</td>';
          html += '<td>' + d.slots + '</td>';
          html += '<td>' + d.paidSlots + '</td>';
          html += '<td>' + d.freeSlots + '</td>';
          html += '<td>' + d.occupiedSlots + '</td>';
          html += '<td>' + d.paidOccupiedSlots + '</td>';
          html += '<td>' + d.freeOccupiedSlots + '</td>';
          html += '<td>' + d.views + '</td>';
          html += '<td>' + d.whatsappClicks + '</td>';
          html += '</tr>';
        }
        html += '</table><br>';
      }
    }

    html += '<h2>SUMMARY</h2>';
    html += '<table border=\"1\" cellpadding=\"5\" cellspacing=\"0\" style=\"border-collapse: collapse;\">';
    html += '<tr><th>City</th><th>Registered</th><th>Active</th><th>Slots</th><th>Paid</th><th>Free</th><th>Occupied</th><th>Occupied paid</th><th>Occupied free</th><th>Views</th><th>WhatsApp</th></tr>';
    for (const city of cities) {
      const r = reports[city];
      html += '<tr>';
      html += '<td>' + city + '</td>';
      html += '<td>' + r.registered + '</td>';
      html += '<td>' + r.active + '</td>';
      html += '<td>' + r.slots + '</td>';
      html += '<td>' + r.paidSlots + '</td>';
      html += '<td>' + r.freeSlots + '</td>';
      html += '<td>' + r.occupiedSlots + '</td>';
      html += '<td>' + r.paidOccupiedSlots + '</td>';
      html += '<td>' + r.freeOccupiedSlots + '</td>';
      html += '<td>' + r.views + '</td>';
      html += '<td>' + r.whatsapp + '</td>';
      html += '</tr>';
    }
    html += '</table>';

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    if (ADMIN_EMAIL) {
      await transporter.sendMail({
        from: SMTP_USER,
        to: ADMIN_EMAIL,
        subject: 'Daily Report ' + dateStr,
        html: html,
      });
    }

    return NextResponse.json({ success: true, date: dateStr, reports });
  } catch (error) {
    console.error('Report error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
