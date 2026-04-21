import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dentistId, serviceId, segment, radius, amount, targetSlotId } = body;

    // Случай 1: Создание нового слота
    if (!targetSlotId) {
      const today = new Date().toISOString().split('T')[0];
      const isPaid = amount > 0;

      // Бесплатный слот — проверка лимита 3 в день
      if (!isPaid) {
        const freeSlots = await db.collection('slots')
          .where('dentistId', '==', dentistId)
          .where('date', '==', today)
          .where('isPaid', '==', false)
          .get();
        
        if (freeSlots.size >= 3) {
          return NextResponse.json({
            success: false,
            error: 'Вы можете создать только 3 бесплатных слота в день. Остальные — платные.'
          }, { status: 400 });
        }
      }

      const slotData = {
        date: today,
        time: new Date().toLocaleTimeString(),
        dentistId,
        serviceId,
        city: 'Almaty',
        isPaid,
        status: 'free',
        price: amount,
        segment,
        radiusKm: radius,
        createdAt: new Date().toISOString(),
      };
      const ref = await db.collection('slots').add(slotData);
      return NextResponse.json({ success: true, slotId: ref.id, type: isPaid ? 'paid' : 'free' });
    }

    // Случай 2: Занятие или вытеснение существующего слота
    const targetSlot = await db.collection('slots').doc(targetSlotId).get();
    
    if (!targetSlot.exists) {
      return NextResponse.json({ success: false, error: 'Слот не найден' }, { status: 404 });
    }

    const slot = targetSlot.data();
    
    if (!slot) {
      return NextResponse.json({ success: false, error: 'Данные слота отсутствуют' }, { status: 404 });
    }

    const isOccupied = slot.status === 'occupied';
    const isTargetPaid = slot.isPaid === true;
    const isOccupierPaying = amount > 0;

    // Вытеснение занятого слота — всегда платно
    if (isOccupied && !isOccupierPaying) {
      return NextResponse.json({
        success: false,
        error: 'Этот слот уже занят. Вытеснение возможно только платно.'
      }, { status: 400 });
    }

    // Если слот свободен, но платный — нужна оплата
    if (!isOccupied && isTargetPaid && !isOccupierPaying) {
      return NextResponse.json({
        success: false,
        error: 'Этот слот платный. Оплатите, чтобы занять.'
      }, { status: 400 });
    }

    // Занимаем (или вытесняем) слот
    const updateData: any = {
      status: 'occupied',
      occupiedBy: dentistId,
      occupiedAt: new Date().toISOString(),
    };
    
    if (isOccupierPaying) {
      updateData.paymentId = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }
    
    if (isOccupied && slot.occupiedBy) {
      updateData.previousOwner = slot.occupiedBy;
    }

    await targetSlot.ref.update(updateData);

    return NextResponse.json({
      success: true,
      action: isOccupied ? 'overwritten' : 'occupied',
      slotId: targetSlotId,
      paid: isOccupierPaying,
    });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}