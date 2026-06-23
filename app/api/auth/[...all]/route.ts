import { getAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const auth = await getAuth();
  if (!auth) {
    return NextResponse.json({ error: 'Auth not initialized' }, { status: 500 });
  }
  return auth.handler(request);
}

export async function POST(request: Request) {
  const auth = await getAuth();
  if (!auth) {
    return NextResponse.json({ error: 'Auth not initialized' }, { status: 500 });
  }
  return auth.handler(request);
}
