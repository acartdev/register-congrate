import { NextResponse } from 'next/server';
import { setServerCookie } from '@/helper/cookie.helper';

export async function POST() {
  try {
    const res = NextResponse.json({
      status: 200,
      message: 'ออกจากระบบสำเร็จ',
    });
    
    // Clear HttpOnly cookies by setting them with past expiration
    res.headers.set('Set-Cookie', [
      setServerCookie('accessToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      }),
      setServerCookie('refreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      }),
    ].join(', '));
    
    return res;
  } catch {
    return NextResponse.json(
      { status: 500, message: 'เกิดข้อผิดพลาดในการออกจากระบบ' },
      { status: 500 },
    );
  }
}