'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth/auth-context';

import { ModeToggle } from './mode-toggle';
import { Wallet } from 'lucide-react';

export function NavBar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const handleConnectWallet = () => {
        // Placeholder for wallet connection functionality
        console.log('Connect wallet clicked');
    };

    return (
        <nav className='border-b'>
            <div className='container mx-auto flex h-16 items-center px-4'>
                <div className='flex items-center space-x-6'>
                    <Link
                        href='/dashboard'
                        className={`hover:text-primary text-sm font-medium transition-colors ${
                            pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                        Dashboard
                    </Link>
                    <Link
                        href='/transfers'
                        className={`hover:text-primary text-sm font-medium transition-colors ${
                            pathname === '/transfers' ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                        Transfers
                    </Link>
                    <Link
                        href='/transactions'
                        className={`hover:text-primary text-sm font-medium transition-colors ${
                            pathname === '/transactions' ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                        Transactions
                    </Link>
                    <Link
                        href='/analytics'
                        className={`hover:text-primary text-sm font-medium transition-colors ${
                            pathname === '/analytics' ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                        Analytics
                    </Link>
                    <Link
                        href='/compliance'
                        className={`hover:text-primary text-sm font-medium transition-colors ${
                            pathname === '/compliance' ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                        Compliance
                    </Link>
                </div>
                <div className='ml-auto flex items-center space-x-4'>
                    {pathname === '/transfers' && (
                        <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-2'
                            onClick={handleConnectWallet}>
                            <Wallet className='h-4 w-4' />
                            Connect Wallet
                        </Button>
                    )}
                    {user ? (
                        <>
                            <Link
                                href='/profile'
                                className={`hover:text-primary text-sm font-medium transition-colors ${
                                    pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'
                                }`}>
                                Profile
                            </Link>
                            <Button variant='outline' onClick={() => logout()}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href='/login'>
                                <Button variant='ghost'>Login</Button>
                            </Link>
                            <Link href='/signup'>
                                <Button>Sign Up</Button>
                            </Link>
                        </>
                    )}
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
}
