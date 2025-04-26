// /app/api/auth/signup/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import Organization from '@/lib/models/Organization';

import mongoose from 'mongoose';

interface SignupRequest {
  email: string;
  otp: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email, otp }: SignupRequest = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required.' }, { status: 400 });
    }

    await dbConnect();

    const domain = email.split('@')[1].toLowerCase();

    // Verify OTP via Oasis
    const verifyOtpResp = await fetch(`${process.env.OASIS_URL}/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    const { verified } = await verifyOtpResp.json();
    if (!verified) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: 'User already exists', user });
    }

    // Find corresponding organization
    const organization = await Organization.findOne({ domain });
    if (!organization) {
      return NextResponse.json({ error: 'Organization not found. Please verify email first.' }, { status: 400 });
    }

    // Create new user
    user = await User.create({
      email,
      domain,
      organization: organization.name,
      orgType: organization.type,
      isVerified: true,
      lastLoginAt: new Date(),
    });

    return NextResponse.json({ message: 'Signup successful', user });
  } catch (error) {
    console.error('[SIGNUP_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

