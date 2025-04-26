import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/utils/session';

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser(req);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // You could also map this with toUserDTO if you want to return public fields only
    return NextResponse.json({ user });
  } catch (error: any) {
    console.error('[ME_ROUTE_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
