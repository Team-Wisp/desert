import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { UserService } from '@/lib/services/UserService';
import { hashEmail } from '@/lib/utils/crypto';

interface SetPasswordRequest {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password }: SetPasswordRequest = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    await dbConnect();

    const emailHash = hashEmail(email);

    await UserService.updateUserPassword({ email: emailHash, password });

    return NextResponse.json({ message: 'Password set successfully.' });
  } catch (error: any) {
    console.error('[SET_PASSWORD_ERROR]', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
