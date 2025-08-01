import { AuthService } from '@/backend-service/services/auth.service';
import { NextResponse } from 'next/server';
import { getServerCookie, setServerCookie } from '@/helper/cookie.helper';

export async function POST(req: Request) {
  const authService = new AuthService();
  const cookieHeader = req.headers.get('cookie') || '';
  const refreshToken = getServerCookie(cookieHeader, 'refreshToken');

  if (!refreshToken) {
    return NextResponse.json(
      { message: 'Refresh token is required' },
      { status: 401 },
    );
  }

  try {
    const response = await authService.refreshToken(refreshToken);
    
    if (response.status === 200 && response.data) {
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      
      const res = NextResponse.json({
        status: 200,
        message: response.message,
      });
      
      // Set new HttpOnly cookies
      res.headers.set('Set-Cookie', [
        setServerCookie('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 15 * 60, // 15 minutes
          path: '/',
        }),
        setServerCookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: '/',
        }),
      ].join(', '));
      
      return res;
    }
    
    return NextResponse.json(response, { status: response.status });
  } catch {
    return NextResponse.json(
      { status: 500, message: 'เกิดข้อผิดพลาดในการรีเฟรชโทเคน' },
      { status: 500 },
    );
  }
}
