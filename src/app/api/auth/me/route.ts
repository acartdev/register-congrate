import { NextResponse } from 'next/server';
import { AuthService } from '@/backend-service/services/auth.service';
import { auth } from '@/config/auth';

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { status: 401, message: 'ไม่พบโทเคนการเข้าสู่ระบบ' },
        { status: 401 },
      );
    }

    if (!session.user) {
      return NextResponse.json(
        { status: 401, message: 'ไม่พบข้อมูลผู้ใช้' },
        { status: 401 },
      );
    }
    const authService = new AuthService();
    const userData = await authService.getUserById(session.user.uuid as string);
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
