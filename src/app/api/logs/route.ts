import { LogsService } from '@/backend-service/services/log.service';
import { auth } from '@/config/auth';
import { isEmpty } from 'lodash';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const logsService = new LogsService();
  const session = await auth();
  if (isEmpty(session)) {
    return NextResponse.json(
      { message: 'Unauthorized', status: 401 },
      { status: 401 },
    );
  }
  const result = await logsService.getLogs(session.user.deptID);
  return NextResponse.json(result, { status: 200 });
};
