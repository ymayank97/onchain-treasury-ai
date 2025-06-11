import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        // Clear auth cookie
        cookies().delete('auth-token');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Logout error:', error);

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
