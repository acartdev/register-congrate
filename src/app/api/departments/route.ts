import { UsersService } from '@/backend-service/services/users.service';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const userService = new UsersService();
    const departments = await userService.getDepartments();
    return NextResponse.json(departments, { status: departments.status });
  } catch {
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแผนก' },
      { status: 500 },
    );
  }
};
