import { NextRequest, NextResponse } from 'next/server';

interface VerifyRequest {
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email }: VerifyRequest = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    // Call Oasis /verify endpoint
    const verifyResp = await fetch(`${process.env.OASIS_URL}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await verifyResp.json();

    if (!verifyResp.ok) {
      return NextResponse.json({ error: data?.error || 'Verification failed.' }, { status: verifyResp.status });
    }

    const { domain, isValid } = data;

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid or unverified domain.' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Email verified successfully.', domain });
  } catch (error) {
    console.error('[VERIFY_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
