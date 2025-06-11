'use client';

import { useState } from 'react';

import { Transaction } from '@/lib/types/banking';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york-v4/ui/select';

interface TransactionListProps {
    transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');

    const filteredTransactions = transactions
        .filter((tx) => {
            const matchesSearch =
                tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tx.reason.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === 'newest') {
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
            }
            if (sortBy === 'oldest') {
                return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
            }
            if (sortBy === 'amount-high') {
                return b.amount - a.amount;
            }
            if (sortBy === 'amount-low') {
                return a.amount - b.amount;
            }
            return 0;
        });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'SUCCESS':
                return 'bg-green-500';
            case 'FAILED':
                return 'bg-red-500';
            case 'PENDING':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
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

    if (!transactions || transactions.length === 0) {
        return <div>No transactions found.</div>;
    }

    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle>Transaction History</CardTitle>
                    <div className='flex items-center space-x-4'>
                        <Input
                            placeholder='Search transactions...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-[200px]'
                        />
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className='w-[150px]'>
                                <SelectValue placeholder='Filter by status' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='all'>All Status</SelectItem>
                                <SelectItem value='SUCCESS'>Success</SelectItem>
                                <SelectItem value='FAILED'>Failed</SelectItem>
                                <SelectItem value='PENDING'>Pending</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className='w-[150px]'>
                                <SelectValue placeholder='Sort by' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='newest'>Newest First</SelectItem>
                                <SelectItem value='oldest'>Oldest First</SelectItem>
                                <SelectItem value='amount-high'>Amount (High to Low)</SelectItem>
                                <SelectItem value='amount-low'>Amount (Low to High)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className='space-y-4'>
                    {filteredTransactions.length === 0 ? (
                        <p className='text-muted-foreground py-4 text-center text-sm'>No transactions found</p>
                    ) : (
                        filteredTransactions.map((tx) => (
                            <div
                                key={tx.id}
                                className='hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors'>
                                <div className='space-y-1'>
                                    <div className='flex items-center space-x-2'>
                                        <span className='font-medium'>{tx.from}</span>
                                        <span className='text-muted-foreground'>→</span>
                                        <span className='font-medium'>{tx.to}</span>
                                    </div>
                                    <p className='text-muted-foreground text-sm'>{tx.reason}</p>
                                    <div className='flex items-center space-x-2'>
                                        <Badge className={getStatusColor(tx.status)}>{tx.status}</Badge>
                                        <Badge className={getRiskLevelColor(tx.risk_level)}>{tx.risk_level} Risk</Badge>
                                        <span className='text-muted-foreground text-sm'>
                                            {new Date(tx.timestamp).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <div className='text-lg font-bold'>${tx.amount.toLocaleString()}</div>
                                    {tx.ai_recommended && (
                                        <Badge variant='outline' className='mt-1'>
                                            AI Recommended
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
