import { ListService } from '@/backend-service/services/lists.service';
import { auth } from '@/config/auth';
import { UserRole } from '@/model/user.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const listService = new ListService();
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('q') as string;
    const session = await auth();
    if (
      session?.user.role !== UserRole.ADMIN &&
      session?.user.role !== UserRole.TEACHER
    ) {
      const result = await listService.getLists(search, +session!.user.id);
      return NextResponse.json(result, { status: result.status });
    } else {
      const result = await listService.getLists(search);
      return NextResponse.json(result, { status: result.status });
    }
  } catch {
    return NextResponse.json({ message: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const listService = new ListService();
    const data = await request.json();
    const session = await auth();
    if (
      session?.user.role !== UserRole.ADMIN &&
      session?.user.role !== UserRole.TEACHER
    ) {
      data.creatorID = +session!.user.id;
    }
    const response = await listService.createList(data, +session!.user.id);
    return NextResponse.json(response, { status: response.status });
  } catch {
    return NextResponse.json({ message: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
};
