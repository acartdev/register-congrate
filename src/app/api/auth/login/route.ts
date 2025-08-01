import { AuthService } from '@/backend-service/services/auth.service';
import { HttpResponse } from '@/model/http.model';
import { NextResponse } from 'next/server';
import { setServerCookie } from '@/helper/cookie.helper';

export async function POST(request: Request) {
  const body = await request.json();
  const { userID, password } = body;

  if (!userID || !password) {
    return NextResponse.json(
      {
        status: 400,
        message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      },
      { status: 400 },
    );
  }

  try {
    const authService = new AuthService();
    const response = await authService.login({ userID, password });
    
    if (response.status === 200 && response.data) {
      const { accessToken, refreshToken } = response.data;
      
      // Create response with cookies
      const res = NextResponse.json({
        status: 200,
        message: response.message,
      });
      
      // Set HttpOnly cookies
      res.headers.append('Set-Cookie', setServerCookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60, // 15 minutes
        path: '/',
      }));
      res.headers.append('Set-Cookie', setServerCookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
      }));
      
      return res;
    }
    
    return NextResponse.json(response, { status: response.status });
  } catch {
    return NextResponse.json<HttpResponse<string>>(
      { status: 500, message: 'เข้าสู่ระบบล้มเหลว' },
      { status: 500 },
    );
  }
}
