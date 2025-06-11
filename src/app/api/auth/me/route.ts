import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

import { eq } from 'drizzle-orm';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token');

        if (!token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        // In a real app, you would validate the token and get the user ID
        // For demo purposes, we'll return a mock user
        const mockUser = {
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
            role: 'admin'
        };

        return NextResponse.json(mockUser);
    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
