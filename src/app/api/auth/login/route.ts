import { AuthService } from '@/backend-service/services/auth.service';
import { HttpResponse } from '@/model/http.model';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { userID, password } = body;
  console.log(body);

  if (!userID || !password) {
    return new Response(JSON.stringify({ error: 'Missing credentials' }), {
      status: 400,
    });
  }

  try {
    const authService = new AuthService();
    const response = await authService.login({ userID, password });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json<HttpResponse<string>>(
      { status: 500, message: 'เข้าสู่ระบบล้มเหลว' },
      { status: 500 },
    );
  }
}
