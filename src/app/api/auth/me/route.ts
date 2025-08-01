import { NextResponse } from 'next/server';
import { getServerCookie } from '@/helper/cookie.helper';
import { verifyAccessToken } from '@/helper/jwt.helper';
import { AuthService } from '@/backend-service/services/auth.service';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const accessToken = getServerCookie(cookieHeader, 'accessToken');

    if (!accessToken) {
      return NextResponse.json(
        { status: 401, message: 'ไม่พบโทเคนการเข้าสู่ระบบ' },
        { status: 401 },
      );
    }

    const decoded = verifyAccessToken(accessToken);

    if (!decoded) {
      return NextResponse.json(
        { status: 401, message: 'โทเคนไม่ถูกต้องหรือหมดอายุ' },
        { status: 401 },
      );
    }
    const authService = new AuthService();
    const userData = await authService.getUserById(decoded.userID);
    return NextResponse.json(
      {
        status: 200,
        message: 'ดึงข้อมูลผู้ใช้สำเร็จ',
        data: userData,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { status: 500, message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' },
      { status: 500 },
    );
  }
}
