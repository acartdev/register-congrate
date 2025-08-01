import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/helper/jwt.helper';

const publicPaths = ['/login', '/register', '/api/auth/login', '/api/auth/register'];
const authPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle CORS for API routes
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin') ?? '';
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
    ];
    const isAllowedOrigin = allowedOrigins.includes(origin);

    if (request.method === 'OPTIONS') {
      const preflightHeaders = {
        ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      };
      return NextResponse.json({}, { headers: preflightHeaders });
    }

    const response = NextResponse.next();
    if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
    return response;
  }

  // Handle authentication for non-API routes
  const accessToken = request.cookies.get('accessToken')?.value;
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // If trying to access auth pages while logged in, redirect to dashboard
  if (authPaths.includes(pathname) && accessToken) {
    const decoded = verifyAccessToken(accessToken);
    if (decoded) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If trying to access protected routes without valid token, redirect to login
  if (!isPublicPath && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verify token for protected routes
  if (!isPublicPath && accessToken) {
    const decoded = verifyAccessToken(accessToken);
    if (!decoded) {
      // Token is invalid, redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|img/|public/).*)',
  ],
};
