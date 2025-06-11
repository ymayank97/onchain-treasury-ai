import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { extension } = await request.json();

        const response = await fetch('https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json;api-version=3.0-preview.1'
            },
            body: JSON.stringify({
                filters: [
                    {
                        criteria: [{ filterType: 7, value: extension }]
                    }
                ],
                flags: 914
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch extension details: ${response.statusText}`);
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching extension details:', error);

        return NextResponse.json({ error: 'Failed to fetch extension details' }, { status: 500 });
    }
}
