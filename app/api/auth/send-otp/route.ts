import { NextRequest, NextResponse } from 'next/server';
import { OasisService } from '@/lib/services/OasisService';

interface SendOtpRequest {
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email }: SendOtpRequest = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    await OasisService.sendOtp(email);

    return NextResponse.json({ message: 'OTP sent successfully to email.' });
  } catch (error: any) {
    console.error('[SEND_OTP_ERROR]', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
