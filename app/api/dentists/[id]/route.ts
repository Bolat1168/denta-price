import { NextResponse } from 'next/server';
import { getDentistById } from '@/lib/storage';

export async function GET(req: Request) {
  try {
    // получаем dentistId из cookie вместо параметра URL
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

    const dentist = await getDentistById(dentistId);
    
    if (!dentist) {
      return NextResponse.json(
        { error: 'Врач не найден' },
        { status: 404 }
      );
    }

    const { passwordHash, ...safeDentist } = dentist;
    
    return NextResponse.json(safeDentist);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Внутренняя ошибка' }, { status: 500 });
  }
}