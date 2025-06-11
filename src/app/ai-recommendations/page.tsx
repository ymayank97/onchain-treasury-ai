'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const recommendations = [
    {
        id: 1,
        from: 'Marketing US',
        to: 'External Vendor Ltd.',
        amount: 15000,
        reason: 'Q2 Marketing Campaign Launch',
        riskLevel: 'LOW',
        priority: 'HIGH',
        expectedROI: '25%'
    },
    {
        id: 2,
        from: 'Finance SG',
        to: 'Tech Partners LLC',
        amount: 25000,
        reason: 'Cloud Infrastructure Upgrade',
        riskLevel: 'LOW',
        priority: 'HIGH',
        expectedROI: '30%'
    },
    {
        id: 3,
        from: 'IT India',
        to: 'Global Solutions Inc',
        amount: 20000,
        reason: 'Software License Renewal',
        riskLevel: 'LOW',
        priority: 'MEDIUM',
        expectedROI: '15%'
    },
    {
        id: 4,
        from: 'Marketing UK',
        to: 'Digital Services Corp',
        amount: 12000,
        reason: 'Social Media Campaign',
        riskLevel: 'LOW',
        priority: 'MEDIUM',
        expectedROI: '20%'
    },
    {
        id: 5,
        from: 'Finance US',
        to: 'Trusted Services Co',
        amount: 30000,
        reason: 'Annual Consulting Services',
        riskLevel: 'LOW',
        priority: 'HIGH',
        expectedROI: '35%'
    },
    {
        id: 6,
        from: 'HR UAE',
        to: 'External Vendor Ltd.',
        amount: 8000,
        reason: 'HR Software Upgrade',
        riskLevel: 'LOW',
        priority: 'MEDIUM',
        expectedROI: '18%'
    },
    {
        id: 7,
        from: 'Operations UK',
        to: 'Tech Partners LLC',
        amount: 18000,
        reason: 'Process Automation Tools',
        riskLevel: 'LOW',
        priority: 'HIGH',
        expectedROI: '28%'
    },
    {
        id: 8,
        from: 'Marketing US',
        to: 'Global Solutions Inc',
        amount: 22000,
        reason: 'Brand Awareness Campaign',
        riskLevel: 'LOW',
        priority: 'MEDIUM',
        expectedROI: '22%'
    },
    {
        id: 9,
        from: 'Finance SG',
        to: 'Digital Services Corp',
        amount: 15000,
        reason: 'Financial Analytics Platform',
        riskLevel: 'LOW',
        priority: 'HIGH',
        expectedROI: '32%'
    },
    {
        id: 10,
        from: 'IT India',
        to: 'Trusted Services Co',
        amount: 25000,
        reason: 'Cybersecurity Enhancement',
        riskLevel: 'LOW',
        priority: 'HIGH',
        expectedROI: '40%'
    }
];

export default function AIRecommendationsPage() {
    const [selectedRecommendation, setSelectedRecommendation] = useState<number | null>(null);

    const handleApprove = async (id: number) => {
        // TODO: Implement approval logic
        console.log('Approving recommendation:', id);
    };

    return (
        <div className='container mx-auto py-6'>
            <h1 className='mb-6 text-3xl font-bold'>AI Recommendations</h1>
            <div className='grid gap-6'>
                {recommendations.map((rec) => (
                    <Card key={rec.id} className='transition-shadow hover:shadow-lg'>
                        <CardHeader>
                            <div className='flex items-start justify-between'>
                                <div>
                                    <CardTitle className='text-xl'>Recommendation #{rec.id}</CardTitle>
                                    <div className='mt-2 space-x-2'>
                                        <Badge variant={rec.riskLevel === 'LOW' ? 'default' : 'destructive'}>
                                            {rec.riskLevel} Risk
                                        </Badge>
                                        <Badge variant='outline'>{rec.priority} Priority</Badge>
                                        <Badge variant='secondary'>ROI: {rec.expectedROI}</Badge>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => handleApprove(rec.id)}
                                    className='bg-green-600 hover:bg-green-700'>
                                    Approve
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className='grid gap-4 md:grid-cols-2'>
                                <div>
                                    <p className='text-sm text-gray-500'>From</p>
                                    <p className='font-medium'>{rec.from}</p>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>To</p>
                                    <p className='font-medium'>{rec.to}</p>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Amount</p>
                                    <p className='font-medium'>${rec.amount.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Reason</p>
                                    <p className='font-medium'>{rec.reason}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
