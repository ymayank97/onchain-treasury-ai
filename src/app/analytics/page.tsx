'use client';

import { AnalyticsDashboard } from '@/components/analytics-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';

export default function AnalyticsPage() {
    return (
        <div className='container mx-auto space-y-6 py-6'>
            <AnalyticsDashboard />
        </div>
    );
}
