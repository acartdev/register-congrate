import { UsersService } from '@/backend-service/services/users.service';
import { RegisterForm } from '@/model/form.model';
import { UserRole } from '@/model/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const userService = new UsersService();
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('q') as string;
    const role = (searchParams.get('role') as UserRole) || UserRole.STUDENT; // Default to STUDENT if not provided
    const deptID =
      (searchParams.get('deptID') as string | undefined) || undefined;
    const users = await userService.getUsersFilter(search, role, deptID);
    return NextResponse.json(users, { status: users.status });
  } catch {
    return NextResponse.json({ message: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const userService = new UsersService();
    const user: RegisterForm = await request.json();
    const response = await userService.createUser(user);
    return NextResponse.json(response, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการสร้างผู้ใช้' },
      { status: 500 },
    );
  }
};
