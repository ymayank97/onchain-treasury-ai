'use client';

import { NavBar } from './nav-bar';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className='bg-background min-h-screen'>
            <NavBar />
            <main className='container mx-auto py-6'>{children}</main>
        </div>
    );
}
