import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Use a server-side secret for JWT verification
const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);

/**
 * Middleware to:
 * - Redirect unauthenticated users from protected routes to /landing
 * - Redirect authenticated users away from /landing to /
 * - Attach user/org info from JWT to request headers for downstream API use
 */
export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const token = request.cookies.get('wisp-token')?.value;

  // Define route types
  const isLandingPage = pathname === '/landing';
  const isPublicAsset = pathname.startsWith('/_next') || pathname.includes('.');
  const isProtectedRoute = !isLandingPage && !isPublicAsset;

  // Authenticated user should not see landing page
  if (isLandingPage && token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.redirect(new URL('/', origin));
    } catch {
      // Invalid token, clear cookie and proceed
      const response = NextResponse.next();
      response.cookies.set('wisp-token', '', { maxAge: 0 });
      return response;
    }
  }

  // Unauthenticated user trying to access protected route
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/landing', origin));
  }

  // Attach user info from JWT to headers for all requests (including API)
  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      const response = NextResponse.next();
      // Attach all relevant user/org info to headers
      response.headers.set('x-user-id', String(payload.sub));
      response.headers.set('x-org', String(payload.org));
      response.headers.set('x-org-type', String(payload.orgType));
      if (payload.userName) response.headers.set('x-username', String(payload.userName));
      // If you use sub as emailHash, set it here for API compatibility
      response.headers.set('x-email-hash', String(payload.sub));
      return response;
    } catch {
      return NextResponse.redirect(new URL('/landing', origin));
    }
  }

  // Default: allow request to proceed
  return NextResponse.next();
}

// Apply middleware to all routes except static assets and favicon and enrich-domain
export const config = {
  matcher: [
    // Exclude enrich-domain from middleware
    '/((?!api/enrich-domain|_next/static|_next/image|favicon.ico).*)',
  ],
};
