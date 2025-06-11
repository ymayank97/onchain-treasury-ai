'use client';

import { useState } from 'react';

import { AIRecommendationPanel } from '@/components/ai-recommendation-panel';
import { TransferForm } from '@/components/transfer-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TransfersPage() {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [transferType, setTransferType] = useState<'department' | 'sui' | null>(null);

    const handleConnectWallet = async () => {
        try {
            if (typeof window !== 'undefined' && window.suiWallet) {
                const accounts = await window.suiWallet.requestAccounts();
                if (accounts && accounts.length > 0) {
                    setIsWalletConnected(true);
                    setTransferType('sui');
                }
            } else {
                alert('Please install Sui Wallet extension');
            }
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            alert('Failed to connect wallet');
        }
    };

    const handleRegularTransfer = () => {
        setTransferType('department');
    };

    return (
        <div className='container mx-auto space-y-8 p-6'>
            <h1 className='mb-8 text-3xl font-bold'>Transfers</h1>

            {!transferType ? (
                <div className='grid gap-6 md:grid-cols-2'>
                    <Card className='transition-shadow hover:shadow-lg'>
                        <CardHeader>
                            <CardTitle>Department Transfer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground mb-4'>
                                Transfer funds between departments or to approved vendors
                            </p>
                            <Button onClick={handleRegularTransfer} className='w-full'>
                                Start Department Transfer
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className='transition-shadow hover:shadow-lg'>
                        <CardHeader>
                            <CardTitle>Sui Blockchain Transfer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground mb-4'>
                                Connect your Sui wallet to perform blockchain transfers
                            </p>
                            <Button onClick={handleConnectWallet} className='w-full bg-purple-600 hover:bg-purple-700'>
                                {isWalletConnected ? 'Wallet Connected' : 'Connect Sui Wallet'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <TransferForm />
            )}

            <AIRecommendationPanel />
        </div>
    );
}
