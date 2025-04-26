import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { UserService } from '@/lib/services/UserService';
import { toUserDTO } from '@/lib/mappers/user.mapper';
import { hashEmail } from '@/lib/utils/crypto';

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password }: LoginRequest = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    await dbConnect();

    const emailHash = hashEmail(email);
    const user = await UserService.getUserByEmail(emailHash);

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    if (!user.password) {
      return NextResponse.json({ error: 'No password set for this account. Please login via OTP.' }, { status: 403 });
    }

    const passwordValid = await UserService.verifyUserPassword(user.password, password);

    if (!passwordValid) {
      return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
    }

    // Successful login
    return NextResponse.json({ message: 'Login successful', user: toUserDTO(user) });
  } catch (error) {
    console.error('[LOGIN_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
