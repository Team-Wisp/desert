import { parseSessionCookie } from '@/lib/utils/cookies';
import { verifyJwt } from '@/lib/utils/jwt';
import { OrganizationType } from '../models/OrganizationType';

export async function getSessionUser(req: Request) {
  const token = parseSessionCookie(req);

  if (!token) {
    return null;
  }

  const payload = verifyJwt(token);

  if (!payload) {
    return null;
  }

  return payload as {
    email: string;
    domain: string;
    orgType: OrganizationType;
    isVerified: boolean;
  };
}
