'use client';

import { useState } from 'react';

import { AIRecommendationPanel } from '@/components/ai-recommendation-panel';
import { initialBalances } from '@/lib/data/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york-v4/ui/select';

export default function DashboardPage() {
    const [selectedBranch, setSelectedBranch] = useState<string>('all');

    // Get unique branch codes
    const branchCodes = Array.from(new Set(initialBalances.map((b) => b.branch_code)));

    // Filter balances based on selected branch
    const filteredBalances =
        selectedBranch === 'all' ? initialBalances : initialBalances.filter((b) => b.branch_code === selectedBranch);

    return (
        <div className='container mx-auto space-y-6 py-6'>
            <div className='mb-6 flex items-center justify-end'>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                    <SelectTrigger className='w-[200px]'>
                        <SelectValue placeholder='Select branch' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem key='all' value='all'>
                            All Branches
                        </SelectItem>
                        {branchCodes.map((code) => (
                            <SelectItem key={`branch-${code}`} value={code}>
                                {code}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Balance Cards */}
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                {filteredBalances.map((balance) => (
                    <Card key={`balance-${balance.entity_name}-${balance.branch_code}`}>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>{balance.entity_name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>${balance.current_balance.toLocaleString()}</div>
                            <div className='text-muted-foreground flex justify-between text-xs'>
                                <span>{balance.entity_type}</span>
                                <span>{balance.country}</span>
                            </div>
                            <div className='text-muted-foreground mt-1 text-xs'>Branch: {balance.branch_code}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* AI Recommendations */}
            <Card>
                <CardHeader>
                    <CardTitle>AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                    <AIRecommendationPanel />
                </CardContent>
            </Card>
        </div>
    );
}
