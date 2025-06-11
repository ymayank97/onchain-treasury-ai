import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { NavBar } from '@/components/nav-bar';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/lib/auth/auth-context';

import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap'
});

export const metadata: Metadata = {
    title: 'Autonomous Transaction Banking Platform',
    description: 'AI-powered transaction system for inter-department payments'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className={inter.className} suppressHydrationWarning>
            <body>
                <AuthProvider>
                    <div className='flex min-h-screen flex-col'>
                        <NavBar />
                        <main className='flex-1'>{children}</main>
                    </div>
                    <Toaster />
                </AuthProvider>
            </body>
        </html>
    );
}
