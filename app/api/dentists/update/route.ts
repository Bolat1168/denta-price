import { NextResponse } from 'next/server';
import { getDentistById, updateDentist } from '@/lib/storage';

export async function POST(req: Request) {
  try {
    // получаем dentistId из cookie
    const cookieHeader = req.headers.get('cookie');
    let dentistId: string | null = null;
    
    if (cookieHeader) {
      const match = cookieHeader.match(/dentistId=([^;]+)/);
      if (match) {
        dentistId = match[1];
      }
    }

    if (!dentistId) {
      return NextResponse.json(
        { error: 'Не авторизован' },
        { status: 401 }
      );
    }

    const { ...updateData } = await req.json();

    const dentist = await getDentistById(dentistId);
    if (!dentist) {
      return NextResponse.json(
        { error: 'Врач не найден' },
        { status: 404 }
      );
    }

    const success = await updateDentist(dentistId, updateData);

    if (!success) {
      return NextResponse.json(
        { error: 'Ошибка обновления' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Внутренняя ошибка' }, { status: 500 });
  }
}