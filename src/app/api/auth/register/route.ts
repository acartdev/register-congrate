import { AuthService } from '@/backend-service/services/auth.service';
import { LogsService } from '@/backend-service/services/log.service';
import { CURD } from '@/model/list.model';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();
  const authService = new AuthService();
  const logsService = new LogsService();
  const res = await authService.register(req);
  await logsService.saveLogs(
    req.deptID,
    'ผู้ใช้ใหม่สมัครสมาชิกรายการ',
    CURD.CREATE,
  );
  return NextResponse.json(res, { status: res.status });
}
