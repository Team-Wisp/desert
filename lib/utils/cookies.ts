import { serialize, parse } from 'cookie';

const TOKEN_NAME = 'session-token';

export function createSessionCookie(token: string) {
  return serialize(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export function parseSessionCookie(req: Request) {
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  return cookies[TOKEN_NAME] || null;
}
