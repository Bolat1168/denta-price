import { NextRequest } from 'next/server';
import { adminAuth } from './firebaseAdmin';

export async function verifyAuth(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session')?.value;
    
    if (!sessionCookie) {
      return { authenticated: false, uid: null };
    }
    
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    
    return {
      authenticated: true,
      uid: decodedClaims.uid,
      email: decodedClaims.email,
    };
  } catch (error) {
    return { authenticated: false, uid: null };
  }
}