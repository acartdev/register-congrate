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
      const result = await listService.getLists(search);
      return NextResponse.json(result, { status: result.status });
    } else {
      const result = await listService.getLists(search);
      return NextResponse.json(result, { status: result.status });
    }
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
