import { LogsService } from '@/backend-service/services/log.service';
import { UsersService } from '@/backend-service/services/users.service';
import { auth } from '@/config/auth';
import { CURD } from '@/model/list.model';
import { isEmpty } from 'lodash';
import { NextResponse } from 'next/server';

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ uuid: string }> },
) => {
  try {
    const logsService = new LogsService();

    const userService = new UsersService();
    const { uuid } = await params;
    const session = await auth();
    if (isEmpty(session)) {
      return NextResponse.json(
        { message: 'Unauthorized', status: 401 },
        { status: 401 },
      );
    }
    const data = await request.json();
    const result = await userService.updateUser({ ...data, uuid });

    await logsService.saveLogs(
      session.user.deptID,
      `อัปเดตผู้ใช้ UUID ${uuid}`,
      CURD.UPDATE,
    );
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการอัปเดตผู้ใช้', status: 500 },
      { status: 500 },
    );
  }
};

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ uuid: string }> },
) => {
  try {
    const userService = new UsersService();
    const { uuid } = await params;
    const result = await userService.getUserByUUID(uuid);
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้', status: 500 },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ uuid: string }> },
) => {
  try {
    const userService = new UsersService();
    const logsService = new LogsService();
    const session = await auth();
    if (isEmpty(session)) {
      return NextResponse.json(
        { message: 'Unauthorized', status: 401 },
        { status: 401 },
      );
    }
    const { uuid } = await params;
    const result = await userService.deleteUser(uuid);
    await logsService.saveLogs(
      session.user.deptID,
      `ลบผู้ใช้ UUID ${uuid}`,
      CURD.DELETE,
    );
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการลบผู้ใช้', status: 500 },
      { status: 500 },
    );
  }
};
