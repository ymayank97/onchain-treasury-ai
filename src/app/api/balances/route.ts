import { NextResponse } from 'next/server';

import { initialBalances } from '@/lib/data/mock-data';

export async function GET() {
    try {
        // In a real application, this would fetch from a database
        return NextResponse.json(initialBalances);
    } catch (error) {
        console.error('Error fetching balances:', error);

        return NextResponse.json({ error: 'Failed to fetch balances' }, { status: 500 });
    }
}
