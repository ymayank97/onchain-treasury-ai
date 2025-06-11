'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york-v4/ui/select';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        companyName: '',
        department: '',
        branchCode: '',
        country: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, just redirect to dashboard
        router.push('/dashboard');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='container flex min-h-screen items-center justify-center py-12'>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create your company account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='space-y-2'>
                            <label htmlFor='email' className='text-sm font-medium'>
                                Email
                            </label>
                            <Input
                                id='email'
                                name='email'
                                type='email'
                                placeholder='Enter your email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor='password' className='text-sm font-medium'>
                                Password
                            </label>
                            <Input
                                id='password'
                                name='password'
                                type='password'
                                placeholder='Create a password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor='companyName' className='text-sm font-medium'>
                                Company Name
                            </label>
                            <Input
                                id='companyName'
                                name='companyName'
                                placeholder='Enter company name'
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor='department' className='text-sm font-medium'>
                                Department
                            </label>
                            <Select
                                value={formData.department}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select department' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='marketing'>Marketing</SelectItem>
                                    <SelectItem value='finance'>Finance</SelectItem>
                                    <SelectItem value='hr'>Human Resources</SelectItem>
                                    <SelectItem value='it'>Information Technology</SelectItem>
                                    <SelectItem value='operations'>Operations</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor='branchCode' className='text-sm font-medium'>
                                Branch Code
                            </label>
                            <Input
                                id='branchCode'
                                name='branchCode'
                                placeholder='Enter branch code'
                                value={formData.branchCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor='country' className='text-sm font-medium'>
                                Country
                            </label>
                            <Select
                                value={formData.country}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select country' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='us'>United States</SelectItem>
                                    <SelectItem value='uk'>United Kingdom</SelectItem>
                                    <SelectItem value='in'>India</SelectItem>
                                    <SelectItem value='sg'>Singapore</SelectItem>
                                    <SelectItem value='ae'>United Arab Emirates</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type='submit' className='w-full'>
                            Create Account
                        </Button>
                        <p className='text-muted-foreground text-center text-sm'>
                            Already have an account?{' '}
                            <Link href='/login' className='text-primary hover:underline'>
                                Login
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
