import { AuthService } from '@/backend-service/services/auth.service';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const authService = new AuthService();
    const data = await req.json();
    const res = await authService.createPassword(data);
    return NextResponse.json(res, { status: res.status });
  } catch {
    return NextResponse.json({ message: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
};
