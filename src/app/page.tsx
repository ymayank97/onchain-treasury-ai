import { redirect } from 'next/navigation';

import { AIRecommendationPanel } from '@/components/ai-recommendation-panel';
import { initialBalances } from '@/lib/data/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';

/**
 * The main page component that renders the HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
export default function Home() {
    redirect('/dashboard');
}
