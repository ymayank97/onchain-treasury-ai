'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { initialBalances, mockTransactions } from '@/lib/data/mock-data';

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function AnalyticsDashboard() {
    // Prepare data for department balance chart
    const departmentBalances = initialBalances
        .filter((balance) => balance.entity_type === 'DEPARTMENT')
        .map((balance) => ({
            name: balance.entity_name,
            amount: balance.current_balance
        }));

    // Prepare data for transaction status pie chart
    const transactionStatus = mockTransactions.reduce(
        (acc, tx) => {
            acc[tx.status] = (acc[tx.status] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>
    );

    const statusData = Object.entries(transactionStatus).map(([name, value]) => ({
        name,
        value
    }));

    // Prepare data for risk level distribution
    const riskLevelData = mockTransactions.reduce(
        (acc, tx) => {
            acc[tx.risk_level] = (acc[tx.risk_level] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>
    );

    const riskData = Object.entries(riskLevelData).map(([name, value]) => ({
        name,
        value
    }));

    if (!departmentBalances || departmentBalances.length === 0) {
        return <div>No data available</div>;
    }

    if (!statusData || statusData.length === 0) {
        return <div>No data available</div>;
    }

    if (!riskData || riskData.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div className='grid gap-6 md:grid-cols-2'>
            <Card className='col-span-2'>
                <CardHeader>
                    <CardTitle>Department Budget Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='h-[400px] w-full'>
                        <ResponsiveContainer width='100%' height='100%'>
                            <BarChart data={departmentBalances}>
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='name' />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey='amount' fill='#8884d8' />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Transaction Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='h-[300px] w-full'>
                        <ResponsiveContainer width='100%' height='100%'>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx='50%'
                                    cy='50%'
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill='#8884d8'
                                    dataKey='value'>
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Risk Level Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='h-[300px] w-full'>
                        <ResponsiveContainer width='100%' height='100%'>
                            <PieChart>
                                <Pie
                                    data={riskData}
                                    cx='50%'
                                    cy='50%'
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill='#8884d8'
                                    dataKey='value'>
                                    {riskData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
