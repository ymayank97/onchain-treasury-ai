import { NextResponse } from 'next/server';

import { departmentLimits, vendorList } from '@/lib/data/mock-data';

interface ComplianceCheck {
    status: 'APPROVED' | 'REJECTED';
    reason: string;
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
}

export async function POST(request: Request) {
    try {
        const { from, to, amount, reason } = await request.json();

        // Validate input
        if (!from || !to || !amount || !reason) {
            return NextResponse.json(
                { status: 'REJECTED', reason: 'Missing required fields', risk_level: 'HIGH' },
                { status: 400 }
            );
        }

        // Check if vendor is blacklisted
        if (vendorList.blacklisted_vendors.includes(to)) {
            return NextResponse.json(
                { status: 'REJECTED', reason: 'Vendor is blacklisted', risk_level: 'HIGH' },
                { status: 403 }
            );
        }

        // Check if vendor is approved
        if (!vendorList.approved_vendors.includes(to)) {
            return NextResponse.json(
                { status: 'REJECTED', reason: 'Vendor is not approved', risk_level: 'MEDIUM' },
                { status: 403 }
            );
        }

        // Check department limits
        if (departmentLimits[from] && amount > departmentLimits[from]) {
            return NextResponse.json(
                { status: 'REJECTED', reason: 'Amount exceeds department limit', risk_level: 'MEDIUM' },
                { status: 403 }
            );
        }

        // Check for suspicious patterns
        const suspiciousKeywords = ['urgent', 'emergency', 'immediate', 'asap'];
        const hasSuspiciousKeywords = suspiciousKeywords.some((keyword) => reason.toLowerCase().includes(keyword));

        if (hasSuspiciousKeywords) {
            return NextResponse.json(
                { status: 'REJECTED', reason: 'Suspicious reason detected', risk_level: 'HIGH' },
                { status: 403 }
            );
        }

        // Check for large amounts
        const isLargeAmount = amount > 20000;
        if (isLargeAmount) {
            return NextResponse.json(
                { status: 'REJECTED', reason: 'Large transfer flagged for review', risk_level: 'MEDIUM' },
                { status: 403 }
            );
        }

        // All checks passed
        return NextResponse.json({ status: 'APPROVED', reason: 'Transaction approved', risk_level: 'LOW' });
    } catch (error) {
        console.error('Error checking compliance:', error);
        return NextResponse.json({ error: 'Failed to check compliance' }, { status: 500 });
    }
}
