// app/api/discover/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface PixabayImages {
    id: number;
    tags: string;
    webformatURL: string; // Use webformatURL for images
}

interface PixabayResponse {
    hits: PixabayImages[];
}

export async function GET(req: NextRequest) {
    const NEXT_PUBLIC_PIXABAY_API_KEY = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;

    try {
        const response = await fetch(
            `https://pixabay.com/api/?key=${NEXT_PUBLIC_PIXABAY_API_KEY}&q=yoga`
        );
        const data: PixabayResponse = await response.json();

        if (response.ok) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json({ error: data }, { status: response.status });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
