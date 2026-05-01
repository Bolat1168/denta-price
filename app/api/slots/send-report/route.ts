import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebaseadmin';

const ADMIN_KEY = process.env.ADMIN_KEY || 'default-key-change-me';
const REPORT_EMAIL = process.env.REPORT_EMAIL || '';
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

async function sendEmail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  await transporter.sendMail({ from: SMTP_USER, to, subject, html });
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('X-Admin-Key');
  if (authHeader !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const email = body.email || REPORT_EMAIL;
    if (!email) {
      return NextResponse.json({ error: 'Email not configured' }, { status: 400 });
    }
    const slotsCount = (await db.collection('slots').get()).size;
    const dentistsCount = (await db.collection('dentists').get()).size;
    const html = `<h1>сего слотов: ${slotsCount}, врачей: ${dentistsCount}</h1>`;
    await sendEmail(email, 'Denta-Price Статистика', html);
    return NextResponse.json({ success: true, message: `Report sent to ${email}` });
  } catch (error) {
    console.error('Send report error:', error);
    return NextResponse.json({ error: 'Failed to send report' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = yesterday.toISOString().split('T')[0];
  
  const slotsSnapshot = await db.collection('slots')
    .where('date', '==', dateStr)
    .get();
  
  const dentistMap = new Map();
  
  for (const doc of slotsSnapshot.docs) {
    const slot = doc.data();
    if (!dentistMap.has(slot.dentistId)) {
      const dentistDoc = await db.collection('dentists').doc(slot.dentistId).get();
      dentistMap.set(slot.dentistId, { 
        email: dentistDoc.data()?.email, 
        name: dentistDoc.data()?.name || 'октор',
        slots: [] 
      });
    }
    dentistMap.get(slot.dentistId).slots.push(slot);
  }
  
  let sentCount = 0;
  for (const [dentistId, data] of dentistMap) {
    if (data.email) {
      await sendEmail(
        data.email,
        `ежедневный отчёт за ${dateStr}`,
        `<h2>уважаемый ${data.name}!</h2>
         <p>за вчера (${dateStr}) у вас было <b>${data.slots.length}</b> записей.</p>
         ${data.slots.length > 0 ? '<p>детали: ' + data.slots.map((s: any) => s.time).join(', ') + '</p>' : ''}`
      );
      sentCount++;
    }
  }
  
  return NextResponse.json({ success: true, sentCount, totalSlots: slotsSnapshot.size });
}