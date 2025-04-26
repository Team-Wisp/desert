import { NextRequest, NextResponse } from 'next/server';
import { OasisService } from '@/lib/services/OasisService';

interface VerifyRequest {
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email }: VerifyRequest = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const parts = email.split('@');
    if (parts.length !== 2) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }
    const domain = parts[1].toLowerCase();

    const { isValid } = await OasisService.verifyDomain(domain);

    return NextResponse.json({ message: 'Email verified successfully.', domain });
  } catch (error: any) {
    console.error('[VERIFY_ERROR]', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
