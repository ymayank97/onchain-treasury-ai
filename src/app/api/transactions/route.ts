import { NextResponse } from 'next/server';

import { Transaction } from '@/lib/types/banking';

// Temporary in-memory store (should be shared with transfer route in a real app)
const transactions: Transaction[] = [];

export function addTransaction(tx: Transaction) {
    transactions.push(tx);
}

export async function GET() {
    try {
        return NextResponse.json(transactions);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }
}
