import { NextRequest, NextResponse } from 'next/server';

interface SendOtpRequest {
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email }: SendOtpRequest = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    // Call Oasis /send-otp endpoint
    const sendOtpResp = await fetch(`${process.env.OASIS_URL}/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!sendOtpResp.ok) {
      const errorData = await sendOtpResp.json();
      return NextResponse.json({ error: errorData?.error || 'Failed to send OTP.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'OTP sent successfully to email.' });
  } catch (error) {
    console.error('[SEND_OTP_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
