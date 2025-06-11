'use client';

import { useState } from 'react';
import React from 'react';

import { initialBalances } from '@/lib/data/mock-data';
import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york-v4/ui/select';
import { Textarea } from '@/registry/new-york-v4/ui/textarea';

import { toast } from 'sonner';

export function TransferForm() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        amount: '',
        reason: ''
    });
    const [complianceCheck, setComplianceCheck] = useState<{
        status: 'APPROVED' | 'REJECTED';
        reason: string;
        risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
    } | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Update error state based on compliance check
    React.useEffect(() => {
        if (!complianceCheck) {
            setError('Please run compliance check first.');
        } else if (complianceCheck.status !== 'APPROVED') {
            setError('Compliance check failed.');
        } else {
            setError(null);
        }
    }, [complianceCheck]);

    const checkCompliance = async () => {
        if (!formData.from || !formData.to || !formData.amount || !formData.reason) {
            toast.error('Please fill in all fields');
            return false;
        }

        try {
            const response = await fetch('/api/check-compliance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    amount: parseFloat(formData.amount)
                })
            });

            const data = await response.json();
            setComplianceCheck(data);

            if (data.status === 'REJECTED') {
                toast.error(data.reason);
                return false;
            }

            return true;
        } catch (error) {
            toast.error('Failed to check compliance');
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Check compliance first
            const isCompliant = await checkCompliance();
            if (!isCompliant) {
                setLoading(false);
                return;
            }

            const response = await fetch('/api/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    amount: parseFloat(formData.amount)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to process transfer');
            }

            toast.success('Transfer completed successfully');
            setFormData({ from: '', to: '', amount: '', reason: '' });
            setComplianceCheck(null);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to process transfer');
        } finally {
            setLoading(false);
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

    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Transfer</CardTitle>
            </CardHeader>
            <CardContent>
                {error && <div className='mb-4 rounded-md bg-red-100 p-4 text-red-700'>{error}</div>}
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='grid gap-4 md:grid-cols-2'>
                        <div className='space-y-2'>
                            <label htmlFor='from' className='text-sm font-medium'>
                                From
                            </label>
                            <Select
                                value={formData.from}
                                onValueChange={(value) => setFormData({ ...formData, from: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select source' />
                                </SelectTrigger>
                                <SelectContent>
                                    {initialBalances.map((balance) => (
                                        <SelectItem key={balance.entity_name} value={balance.entity_name}>
                                            {balance.entity_name} (${balance.current_balance.toLocaleString()})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor='to' className='text-sm font-medium'>
                                To
                            </label>
                            <Select
                                value={formData.to}
                                onValueChange={(value) => setFormData({ ...formData, to: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select recipient' />
                                </SelectTrigger>
                                <SelectContent>
                                    {initialBalances.map((balance) => (
                                        <SelectItem key={balance.entity_name} value={balance.entity_name}>
                                            {balance.entity_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='amount' className='text-sm font-medium'>
                            Amount
                        </label>
                        <Input
                            id='amount'
                            type='number'
                            min='0'
                            step='0.01'
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            placeholder='Enter amount'
                            required
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor='reason' className='text-sm font-medium'>
                            Reason
                        </label>
                        <Textarea
                            id='reason'
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            placeholder='Enter transfer reason'
                            required
                        />
                    </div>
                    {complianceCheck && (
                        <Card>
                            <CardHeader className='py-2'>
                                <CardTitle className='text-sm'>Compliance Check</CardTitle>
                            </CardHeader>
                            <CardContent className='py-2'>
                                <div className='flex items-center justify-between'>
                                    <div className='space-y-1'>
                                        <p className='text-sm'>{complianceCheck.reason}</p>
                                        <Badge className={getRiskLevelColor(complianceCheck.risk_level)}>
                                            {complianceCheck.risk_level} Risk
                                        </Badge>
                                    </div>
                                    <Badge
                                        className={
                                            complianceCheck.status === 'APPROVED' ? 'bg-green-500' : 'bg-red-500'
                                        }>
                                        {complianceCheck.status}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    <Button type='submit' className='w-full' disabled={loading}>
                        {loading ? 'Processing...' : 'Execute Transfer'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
