import { NextResponse } from 'next/server';

// PayFast integration is temporarily disabled while migrating to new order system.
export async function POST(req: Request) {
    return NextResponse.json({ error: 'PayFast integration is under maintenance.' }, { status: 503 });
}
