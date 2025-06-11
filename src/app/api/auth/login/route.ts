import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // In a real app, you would hash the password and compare with stored hash
        // For demo purposes, we'll use a simple check
        const user = await db.query.users.findFirst({
            where: eq(users.email, email)
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (user.password !== password) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // Set auth cookie
        const cookieStore = await cookies();
        cookieStore.set('auth-token', 'demo-token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        // Return user data (excluding password)
        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
