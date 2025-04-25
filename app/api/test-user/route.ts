import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const { name, email, password } = body;

    const user = await User.create({ name, email, password });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "API is working 🎉" });
}
