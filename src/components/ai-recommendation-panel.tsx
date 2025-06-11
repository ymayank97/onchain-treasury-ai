'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { initialBalances, mockTransactions } from '@/lib/data/mock-data';

interface Recommendation {
    id: number;
    from: string;
    to: string;
    amount: number;
    reason: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    expectedROI: string;
    category: 'OPERATIONAL' | 'STRATEGIC' | 'EMERGENCY';
}

export function AIRecommendationPanel() {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(false);

    const generateRecommendations = () => {
        setLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            const newRecommendations: Recommendation[] = [
                // Low Risk Recommendations
                {
                    id: 1,
                    from: 'Marketing US',
                    to: 'External Vendor Ltd.',
                    amount: 15000,
                    reason: 'Q2 Marketing Campaign Launch',
                    riskLevel: 'LOW',
                    priority: 'HIGH',
                    expectedROI: '25%',
                    category: 'STRATEGIC'
                },
                {
                    id: 2,
                    from: 'Finance SG',
                    to: 'Tech Partners LLC',
                    amount: 25000,
                    reason: 'Cloud Infrastructure Upgrade',
                    riskLevel: 'LOW',
                    priority: 'HIGH',
                    expectedROI: '30%',
                    category: 'OPERATIONAL'
                },
                // Medium Risk Recommendations
                {
                    id: 3,
                    from: 'IT India',
                    to: 'Global Solutions Inc',
                    amount: 35000,
                    reason: 'Enterprise Software Implementation',
                    riskLevel: 'MEDIUM',
                    priority: 'MEDIUM',
                    expectedROI: '20%',
                    category: 'STRATEGIC'
                },
                {
                    id: 4,
                    from: 'Marketing UK',
                    to: 'Digital Services Corp',
                    amount: 28000,
                    reason: 'International Market Expansion',
                    riskLevel: 'MEDIUM',
                    priority: 'HIGH',
                    expectedROI: '35%',
                    category: 'STRATEGIC'
                },
                // High Risk Recommendations
                {
                    id: 5,
                    from: 'Finance US',
                    to: 'Trusted Services Co',
                    amount: 50000,
                    reason: 'Merger & Acquisition Support',
                    riskLevel: 'HIGH',
                    priority: 'HIGH',
                    expectedROI: '45%',
                    category: 'STRATEGIC'
                },
                {
                    id: 6,
                    from: 'Operations UK',
                    to: 'Tech Partners LLC',
                    amount: 40000,
                    reason: 'Emergency System Upgrade',
                    riskLevel: 'HIGH',
                    priority: 'HIGH',
                    expectedROI: '40%',
                    category: 'EMERGENCY'
                }
            ];

            setRecommendations(newRecommendations);
            setLoading(false);
        }, 1500); // Simulate 1.5s delay
    };

    const getRiskLevelColor = (riskLevel: string) => {
        switch (riskLevel) {
            case 'LOW':
                return 'bg-green-500';
            case 'MEDIUM':
                return 'bg-yellow-500';
            case 'HIGH':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'OPERATIONAL':
                return 'bg-blue-500';
            case 'STRATEGIC':
                return 'bg-purple-500';
            case 'EMERGENCY':
                return 'bg-orange-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className='space-y-6'>
            <div className='flex justify-end'>
                <Button
                    onClick={generateRecommendations}
                    disabled={loading}
                    className='bg-purple-600 hover:bg-purple-700'>
                    {loading ? 'Generating...' : 'Get AI Recommendations'}
                </Button>
            </div>

            {recommendations.length > 0 && (
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
                                            <Badge className={getCategoryColor(rec.category)}>{rec.category}</Badge>
                                        </div>
                                    </div>
                                    <Button className='bg-green-600 hover:bg-green-700'>Approve</Button>
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
            )}
        </div>
    );
}
