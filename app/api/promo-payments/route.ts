import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

const DATA_FILE_PATH = path.join(process.cwd(), 'data-src', 'promo_payments.json');

interface PaymentRequest {
  dentistId: string;
  serviceId: string;
  segment: string;
  radius: number | 'city';
  amount: number;
}

interface PaymentRecord {
  id: string;
  dentistId: string;
  serviceId: string;
  segment: string;
  radius: number | 'city';
  amount: number;
  status: 'PENDING' | 'PAID';
  createdAt: string;
  paidAt: string | null;
  paymentUrl: string;
  paymentId: string;
}

async function readPayments(): Promise<PaymentRecord[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    let existingData = JSON.parse(data);
    if (!Array.isArray(existingData)) existingData = [];
    return existingData;
  } catch (error) {
    return [];
  }
}

async function writePayments(payments: PaymentRecord[]): Promise<void> {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(payments, null, 2), 'utf-8');
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json();
    
    // Валидация обязательных полей
    if (
      !body ||
      typeof body.dentistId !== 'string' || body.dentistId.trim() === '' ||
      typeof body.serviceId !== 'string' || body.serviceId.trim() === '' ||
      typeof body.segment !== 'string' || body.segment.trim() === '' ||
      (typeof body.radius !== 'number' && body.radius !== 'city') ||
      typeof body.amount !== 'number' || Number.isNaN(body.amount)
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Валидация радиуса
    const validRadii = ['city', 1, 3, 6];
    if (!validRadii.includes(body.radius)) {
      return NextResponse.json(
        { error: 'Invalid radius value. Must be city, 1, 3 or 6' },
        { status: 400 }
      );
    }

    // Валидация сегмента
    const validSegments = ['econom', 'comfort', 'optimum', 'premium', 'luxury'];
    if (!validSegments.includes(body.segment)) {
      return NextResponse.json(
        { error: 'Invalid segment value' },
        { status: 400 }
      );
    }

    // Чтение существующих платежей
    const payments = await readPayments();
    
    // Генерация ID платежа
    const paymentId = `pay_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
    
    // Создание новой записи о платеже
    const newPayment: PaymentRecord = {
      id: randomUUID(),
      dentistId: body.dentistId,
      serviceId: body.serviceId,
      segment: body.segment,
      radius: body.radius,
      amount: body.amount,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      paidAt: null,
      paymentUrl: '',
      paymentId: paymentId,
    };

    // Добавление в массив и сохранение
    payments.push(newPayment);
    await writePayments(payments);

    return NextResponse.json({
      success: true,
      paymentId: newPayment.paymentId,
      paymentRecordId: newPayment.id,
      paymentUrl: newPayment.paymentUrl,
      message: 'Payment initiated successfully'
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
