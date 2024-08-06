// app/api/meditation-music/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface PixabayVideo {
    id: number;
    tags: string;
    videos: {
        medium: {
            url: string;
        };
    };
}

interface PixabayResponse {
    hits: PixabayVideo[];
}

export async function GET(req: NextRequest) {
    const NEXT_PUBLIC_PIXABAY_API_KEY = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;

    try {
        const response = await fetch(
            `https://pixabay.com/api/videos/?key=${NEXT_PUBLIC_PIXABAY_API_KEY}&q=meditation`
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
