import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  console.log(`🧭 Middleware running for: ${url.pathname}`);

  const token = request.cookies.get('wisp-token')?.value;

  if (!token) {
    console.warn("🚫 No wisp-token cookie found. Redirecting to homepage.");
    return NextResponse.redirect(new URL('/', url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    console.log("✅ JWT verified:", {
      sub: payload.sub,
      org: payload.org,
      orgType: payload.orgType,
    });

    const response = NextResponse.next();
    response.headers.set('x-user-id', String(payload.sub));
    response.headers.set('x-org', String(payload.org));
    response.headers.set('x-org-type', String(payload.orgType));

    return response;
  } catch (err) {
    console.error("❌ JWT verification failed:", err);
    return NextResponse.redirect(new URL('/', url));
  }
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/feed',
    '/feed/:path*',
    '/org',
    '/org/:path*',
  ],
};
