import { NextResponse } from 'next/server';

import { initialBalances } from '@/lib/data/mock-data';

interface AIRecommendation {
    recommendation: 'TRANSFER' | 'HOLD';
    from: string;
    to: string;
    amount: number;
    reason: string;
}

export async function POST() {
    try {
        // In a real implementation, this would call OpenAI API
        // For now, we'll implement a simple rule-based recommendation system

        const balanceData = initialBalances.map((b) => ({
            name: b.entity_name,
            balance: b.current_balance,
            type: b.entity_type
        }));

        // Simple rule: If any department has more than $10,000, suggest a transfer
        const departments = balanceData.filter((b) => b.type === 'DEPARTMENT');
        const vendors = balanceData.filter((b) => b.type === 'VENDOR');

        const departmentWithExcess = departments.find((d) => d.balance > 10000);

        if (!departmentWithExcess) {
            return NextResponse.json({
                recommendation: 'HOLD',
                reason: 'No departments have excess funds to transfer'
            });
        }

        // Find a vendor to transfer to
        const targetVendor = vendors[0]; // In a real system, this would be more sophisticated

        const recommendation: AIRecommendation = {
            recommendation: 'TRANSFER',
            from: departmentWithExcess.name,
            to: targetVendor.name,
            amount: Math.min(departmentWithExcess.balance - 10000, 5000), // Keep at least $10,000, transfer up to $5,000
            reason: `Transfer excess funds from ${departmentWithExcess.name} to ${targetVendor.name} to optimize department balance`
        };

        if (Object.keys(balances).length === 0) {
            return NextResponse.json({ error: 'No balances found' }, { status: 404 });
        }

        return NextResponse.json(recommendation);
    } catch (error) {
        console.error('Error generating AI recommendation:', error);
        return NextResponse.json({ error: 'Failed to generate recommendation' }, { status: 500 });
    }
}
