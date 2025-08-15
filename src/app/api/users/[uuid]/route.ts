import { UsersService } from '@/backend-service/services/users.service';
import { NextResponse } from 'next/server';

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ uuid: string }> },
) => {
  try {
    const userService = new UsersService();
    const { uuid } = await params;
    const data = await request.json();
    const result = await userService.updateUser({ ...data, uuid });
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการอัปเดตผู้ใช้', status: 500 },
      { status: 500 },
    );
  }
};
