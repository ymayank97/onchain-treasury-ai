'use client';

import { mockTransactions } from '@/lib/data/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';

export default function TransactionsPage() {
    return (
        <div className='container mx-auto space-y-6 py-6'>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='space-y-4'>
                        {mockTransactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className='bg-card flex items-center justify-between rounded-lg border p-4'>
                                <div className='space-y-1'>
                                    <div className='flex items-center space-x-2'>
                                        <span className='font-medium'>{transaction.from}</span>
                                        <span className='text-muted-foreground'>→</span>
                                        <span className='font-medium'>{transaction.to}</span>
                                    </div>
                                    <div className='text-muted-foreground text-sm'>{transaction.reason}</div>
                                    <div className='text-muted-foreground text-xs'>
                                        Branch: {transaction.branch_code}
                                    </div>
                                </div>
                                <div className='space-y-1 text-right'>
                                    <div className='text-lg font-bold'>${transaction.amount.toLocaleString()}</div>
                                    <div className='text-muted-foreground text-xs'>
                                        {new Date(transaction.timestamp).toLocaleString()}
                                    </div>
                                    <div
                                        className={`text-xs ${
                                            transaction.status === 'SUCCESS'
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-red-600 dark:text-red-400'
                                        }`}>
                                        {transaction.status}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
