import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { UserService } from '@/lib/services/UserService';
import { OrganizationService } from '@/lib/services/OrganizationService';
import { OasisService } from '@/lib/services/OasisService';
import { hashEmail } from '@/lib/utils/crypto';
import { toUserDTO } from '@/lib/mappers/user.mapper';

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
    const emailHash = hashEmail(email);
    console.log(emailHash)
    // Verify OTP with Oasis
    await OasisService.verifyOtp(emailHash, otp);

    // Check if user already exists
    const existingUser = await UserService.getUserByEmail(emailHash);
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists', user: toUserDTO(existingUser) });
    }

    // Find corresponding organization
    const organization = await OrganizationService.getOrganizationByDomain(domain);
    if (!organization) {
      return NextResponse.json({ error: 'Organization not found. Please verify email first.' }, { status: 400 });
    }

    // Create new user
    const newUser = await UserService.createUser({
      email: emailHash,  // Store hashed email
      domain,
      organization: organization.name,
      orgType: organization.type,
      isVerified: true,
      lastLoginAt: new Date(),
    });

    return NextResponse.json({ message: 'Signup successful', user: toUserDTO(newUser) });
  } catch (error: any) {
    console.error('[SIGNUP_ERROR]', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
