import { UsersService } from '@/backend-service/services/users.service';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const userService = new UsersService();
    const searchParams = request.nextUrl.searchParams;
    const verificationToken = searchParams.get('token') as string;
    const result = await userService.verifyUser(verificationToken);
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการยืนยันผู้ใช้', status: 500 },
      { status: 500 },
    );
  }
};
