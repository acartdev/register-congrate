import NextAuth from 'next-auth';
import { authOptions } from './config/auth';
export default NextAuth(authOptions).auth;

// กำหนด matcher สำหรับ middleware เพื่อให้ทำงานกับ path ที่ต้องการ
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // สำหรับทุก path ยกเว้น static files
  //   matcher: [
  //     '/',
  //     '/home/:path*',
  //     '/profile/:path*',
  //     '/dashboard/:path*',
  //     '/login',
  //     '/register',
  //     '/api/:path*',
  //   ], // ระบุ path ที่ต้องการให้ middleware ทำงาน
};
