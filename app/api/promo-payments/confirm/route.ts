import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data-src', 'promo_payments.json');

interface PaymentRecord {
  id: string;
  dentistId: string;
  serviceId: string;
  segment: string;
  radius: number;
  amount: number;
  status: 'PENDING' | 'PAID';
  createdAt: string;
  paidAt: string | null;
  paymentUrl: string;
  paymentId: string;
}

interface ConfirmRequest {
  paymentRecordId: string;
}

async function readPayments(): Promise<PaymentRecord[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    let payments = JSON.parse(data);
    if (!Array.isArray(payments)) payments = [];
    return payments;
  } catch (error) {
    return [];
  }
}

async function writePayments(payments: PaymentRecord[]): Promise<void> {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(payments, null, 2), 'utf-8');
}

export async function POST(request: NextRequest) {
  try {
    const body: ConfirmRequest = await request.json();
    const { paymentRecordId } = body;

    if (
      !body ||
      typeof paymentRecordId !== 'string' ||
      paymentRecordId.trim() === ''
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid paymentRecordId' },
        { status: 400 }
      );
    }

    const payments = await readPayments();
    const paymentIndex = payments.findIndex(p => p.id === paymentRecordId);

    if (paymentIndex === -1) {
      return NextResponse.json(
        { error: 'Payment record not found' },
        { status: 404 }
      );
    }

    const payment = payments[paymentIndex];

    if (payment.status === 'PAID') {
      return NextResponse.json(
        { error: 'Payment already confirmed' },
        { status: 409 }
      );
    }

    if (payment.status === 'PENDING') {
      payment.status = 'PAID';
      payment.paidAt = new Date().toISOString();
    } else {
      return NextResponse.json(
        { error: 'Invalid payment status' },
        { status: 400 }
      );
    }

    await writePayments(payments);

    return NextResponse.json({
      success: true,
      message: `Payment ${paymentRecordId} confirmed successfully`,
      payment: payment
    });

  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}