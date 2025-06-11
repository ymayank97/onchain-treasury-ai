import { NextResponse } from 'next/server';

import { departmentLimits, initialBalances, vendorList } from '@/lib/data/mock-data';
import { Transaction } from '@/lib/types/banking';

import { addTransaction } from '../transactions/route';

export async function POST(request: Request) {
    try {
        const { from, to, amount, reason } = await request.json();

        // Validate input
        if (!from || !to || !amount || !reason) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if amount is positive
        if (amount <= 0) {
            return NextResponse.json({ error: 'Amount must be greater than 0' }, { status: 400 });
        }

        // Find source balance
        const sourceBalance = initialBalances.find((b) => b.entity_name === from);
        if (!sourceBalance) {
            return NextResponse.json({ error: 'Source entity not found' }, { status: 404 });
        }

        // Check if source has sufficient funds
        if (sourceBalance.current_balance < amount) {
            return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 });
        }

        // Check department limits
        if (sourceBalance.entity_type === 'DEPARTMENT' && amount > departmentLimits[from]) {
            return NextResponse.json({ error: 'Transfer amount exceeds department limit' }, { status: 400 });
        }

        // Check if vendor is blacklisted
        if (vendorList.blacklisted_vendors.includes(to)) {
            return NextResponse.json({ error: 'Cannot transfer to blacklisted vendor' }, { status: 400 });
        }

        // Create transaction
        const transaction: Transaction = {
            id: `tx_${Date.now()}`,
            timestamp: new Date().toISOString(),
            from,
            to,
            amount,
            status: 'SUCCESS',
            reason,
            compliance_status: 'APPROVED',
            ai_recommended: false,
            risk_level: 'LOW'
        };

        // Update balances
        sourceBalance.current_balance -= amount;
        const targetBalance = initialBalances.find((b) => b.entity_name === to);
        if (targetBalance) {
            targetBalance.current_balance += amount;
            targetBalance.last_updated = new Date().toISOString();
        }

        // Store transaction
        addTransaction(transaction);

        return NextResponse.json({
            transaction_id: transaction.id,
            status: 'SUCCESS',
            timestamp: transaction.timestamp,
            message: 'Transfer completed successfully'
        });
    } catch (error) {
        console.error('Error processing transfer:', error);

        return NextResponse.json({ error: 'Failed to process transfer' }, { status: 500 });
    }
}
