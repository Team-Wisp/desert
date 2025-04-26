import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseSessionCookie } from '@/lib/utils/cookies';
import { verifyJwt } from '@/lib/utils/jwt';

// Middleware function
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect certain routes
  const protectedRoutes = ['/api/posts', '/api/comments'];

  const isProtected = protectedRoutes.some((path) => pathname.startsWith(path));

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = parseSessionCookie(req);

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized - No Token' }, { status: 401 });
  }

  const payload = verifyJwt(token);

  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized - Invalid Token' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
    matcher: [
      '/api/posts/:path*',
      '/api/comments/:path*',
    ],
  };
  