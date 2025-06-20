import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const token = request.cookies.get('wisp-token')?.value;

  const isLandingPage = pathname === '/landing';
  const isPublicAsset = pathname.startsWith('/_next') || pathname.includes('.');
  const isProtectedRoute = !isLandingPage && !isPublicAsset;

  // Case: authenticated user trying to access landing
  if (isLandingPage && token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.redirect(new URL('/', origin));
    } catch {
      const response = NextResponse.next();
      response.cookies.set('wisp-token', '', { maxAge: 0 });
      return response;
    }
  }

  // Case: unauthenticated user trying to access protected route
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/landing', origin));
  }

  // Case: authenticated user accessing valid route
  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      console.log('Decoded JWT payload:', payload);
      const response = NextResponse.next();
      response.headers.set('x-user-id', String(payload.sub));
      response.headers.set('x-org', String(payload.org));
      response.headers.set('x-org-type', String(payload.orgType));
      if (payload.userName) response.headers.set('x-username', String(payload.userName));
      if (payload.emailHash) response.headers.set('x-email-hash', String(payload.emailHash));
      console.log('Set headers:', {
        'x-user-id': String(payload.sub),
        'x-org': String(payload.org),
        'x-org-type': String(payload.orgType),
        'x-username': payload.userName,
        'x-email-hash': payload.emailHash,
      });
      return response;
    } catch {
      return NextResponse.redirect(new URL('/landing', origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
