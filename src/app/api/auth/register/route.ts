import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();
  return NextResponse.json(req);
}
