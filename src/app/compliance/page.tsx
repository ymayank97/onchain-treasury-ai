'use client';

import { departmentLimits, vendorList } from '@/lib/data/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';

export default function CompliancePage() {
    return (
        <div className='container mx-auto space-y-6 py-6'>
            <div className='grid gap-4 md:grid-cols-2'>
                {/* Approved Vendors */}
                <Card>
                    <CardHeader>
                        <CardTitle>Approved Vendors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-2'>
                            {vendorList.approved.map((vendor) => (
                                <div
                                    key={vendor}
                                    className='flex items-center justify-between rounded-lg bg-green-50 p-2 dark:bg-green-950'>
                                    <span className='text-sm font-medium'>{vendor}</span>
                                    <span className='text-xs text-green-600 dark:text-green-400'>Approved</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Blacklisted Vendors */}
                <Card>
                    <CardHeader>
                        <CardTitle>Blacklisted Vendors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-2'>
                            {vendorList.blacklisted.map((vendor) => (
                                <div
                                    key={vendor}
                                    className='flex items-center justify-between rounded-lg bg-red-50 p-2 dark:bg-red-950'>
                                    <span className='text-sm font-medium'>{vendor}</span>
                                    <span className='text-xs text-red-600 dark:text-red-400'>Blacklisted</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Department Transfer Limits */}
                <Card className='md:col-span-2'>
                    <CardHeader>
                        <CardTitle>Department Transfer Limits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                            {departmentLimits.map((limit) => (
                                <div key={limit.department} className='bg-card rounded-lg border p-4'>
                                    <div className='mb-2 flex items-center justify-between'>
                                        <span className='text-sm font-medium'>{limit.department}</span>
                                        <span className='text-muted-foreground text-xs'>{limit.branch_code}</span>
                                    </div>
                                    <div className='text-2xl font-bold'>${limit.limit.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
