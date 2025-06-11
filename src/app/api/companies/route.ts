import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { companies } from '@/lib/db/schema';

import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const userCompanies = await db.query.companies.findMany({
            where: eq(companies.userId, userId)
        });

        return NextResponse.json(userCompanies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, accountNumber, branchCode, userId } = body;

        if (!name || !accountNumber || !branchCode || !userId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newCompany = await db
            .insert(companies)
            .values({
                name,
                accountNumber,
                branchCode,
                userId
            })
            .returning();

        return NextResponse.json(newCompany[0]);
    } catch (error) {
        console.error('Error creating company:', error);
        return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
    }
}
