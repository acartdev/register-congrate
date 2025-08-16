import { UsersService } from '@/backend-service/services/users.service';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const userService = new UsersService();
    const searchParams = request.nextUrl.searchParams;
    const verificationToken = searchParams.get('token') as string;

    if (!verificationToken) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login?verified=false` as string,
      );
    }

    const result = await userService.verifyUser(verificationToken);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login?verified=${result.status === 200}` as string,
    );
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login?verified=false` as string,
    );
  }
};
