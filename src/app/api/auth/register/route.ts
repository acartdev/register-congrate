import { AuthService } from '@/backend-service/services/auth.service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();
  const authService = new AuthService();
  const res = await authService.register(req);
  return NextResponse.json(res, { status: res.status });
}
