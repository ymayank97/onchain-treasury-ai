'use client';

import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Input } from '@/registry/new-york-v4/ui/input';

import { toast } from 'sonner';

interface Company {
    id: string;
    name: string;
    accountNumber: string;
    branchCode: string;
}

export default function ProfilePage() {
    const [userInfo, setUserInfo] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin'
    });

    const [companies, setCompanies] = useState<Company[]>([
        {
            id: '1',
            name: 'Acme Corp',
            accountNumber: 'ACC123456',
            branchCode: 'NYC001'
        }
    ]);

    const [newCompany, setNewCompany] = useState({
        name: '',
        accountNumber: '',
        branchCode: ''
    });

    const handleAddCompany = () => {
        if (!newCompany.name || !newCompany.accountNumber || !newCompany.branchCode) {
            toast({
                title: 'Error',
                description: 'All fields are required.',
                variant: 'destructive'
            });
            return;
        }

        const company = {
            id: Date.now().toString(),
            ...newCompany
        };

        setCompanies([...companies, company]);
        setNewCompany({ name: '', accountNumber: '', branchCode: '' });
        toast.success('Company added successfully');
    };

    return (
        <div className='container mx-auto space-y-6 py-6'>
            {/* User Profile */}
            <Card>
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='grid gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='name'>Name</Label>
                            <Input id='name' value={userInfo.name} readOnly />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input id='email' value={userInfo.email} readOnly />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='role'>Role</Label>
                            <Input id='role' value={userInfo.role} readOnly />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Company Management */}
            <Card>
                <CardHeader>
                    <CardTitle>Company Management</CardTitle>
                </CardHeader>
                <CardContent className='space-y-6'>
                    {/* Add New Company Form */}
                    <div className='grid gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='companyName'>Company Name</Label>
                            <Input
                                id='companyName'
                                value={newCompany.name}
                                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                                placeholder='Enter company name'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='accountNumber'>Account Number</Label>
                            <Input
                                id='accountNumber'
                                value={newCompany.accountNumber}
                                onChange={(e) => setNewCompany({ ...newCompany, accountNumber: e.target.value })}
                                placeholder='Enter account number'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='branchCode'>Branch Code</Label>
                            <Input
                                id='branchCode'
                                value={newCompany.branchCode}
                                onChange={(e) => setNewCompany({ ...newCompany, branchCode: e.target.value })}
                                placeholder='Enter branch code'
                            />
                        </div>
                        <Button onClick={handleAddCompany}>Add Company</Button>
                    </div>

                    {/* Company List */}
                    <div className='space-y-4'>
                        <h3 className='font-medium'>Your Companies</h3>
                        <div className='grid gap-4'>
                            {companies.map((company) => (
                                <Card key={company.id}>
                                    <CardContent className='pt-6'>
                                        <div className='grid gap-2'>
                                            <div className='flex items-center justify-between'>
                                                <div>
                                                    <p className='font-medium'>{company.name}</p>
                                                    <p className='text-muted-foreground text-sm'>
                                                        Account: {company.accountNumber}
                                                    </p>
                                                </div>
                                                <div className='text-right'>
                                                    <p className='text-sm font-medium'>Branch</p>
                                                    <p className='text-muted-foreground text-sm'>
                                                        {company.branchCode}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
