import { db } from '@/lib/firebase/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';

const LOCKS_COLLECTION = 'paymentLocks';
const LOCK_TTL_SECONDS = 120;

export interface PaymentLock {
  id?: string;
  dentistId: string;
  serviceId: string;
  segment: string;
  radius: number | 'city';  // ИЗМЕНЕНО: добавлен 'city'
  expiresAt: Timestamp;
  createdAt: Timestamp;
}

export async function acquireLock(
  dentistId: string,
  serviceId: string,
  segment: string,
  radius: number | 'city'  // ИЗМЕНЕНО: добавлен 'city'
): Promise<boolean> {
  const now = Timestamp.now();
  const expiresAt = new Timestamp(now.seconds + LOCK_TTL_SECONDS, now.nanoseconds);

  const existing = await db.collection(LOCKS_COLLECTION)
    .where('serviceId', '==', serviceId)
    .where('segment', '==', segment)
    .where('radius', '==', radius)
    .where('expiresAt', '>', now)
    .get();

  if (!existing.empty) {
    const ownLock = existing.docs.find(doc => doc.data().dentistId === dentistId);
    if (ownLock) {
      await ownLock.ref.update({ expiresAt });
      return true;
    }
    return false;
  }

  await db.collection(LOCKS_COLLECTION).add({
    dentistId,
    serviceId,
    segment,
    radius,
    expiresAt,
    createdAt: now,
  });

  return true;
}

export async function releaseLock(
  dentistId: string,
  serviceId: string,
  segment: string,
  radius: number | 'city'  // ИЗМЕНЕНО: добавлен 'city'
): Promise<void> {
  const now = Timestamp.now();
  const snapshot = await db.collection(LOCKS_COLLECTION)
    .where('dentistId', '==', dentistId)
    .where('serviceId', '==', serviceId)
    .where('segment', '==', segment)
    .where('radius', '==', radius)
    .where('expiresAt', '>', now)
    .get();

  const batch = db.batch();
  snapshot.docs.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
}