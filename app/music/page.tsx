'use client';

import GoBackButton from '@/components/GoBackButton';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';

interface Video {
    id: number;
    tags: string;
    videos: {
        medium: {
            url: string;
        };
    };
}

export default function Home() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await fetch('/api/meditation-music');
            if (res.ok) {
                const data = await res.json();
                setVideos(data.hits); // Assuming data.hits contains the video information
            } else {
                console.error('Failed to fetch videos');
            }
        };

        fetchVideos();
    }, []);

    const handleNext = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const handlePrev = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    };

    return (
        <>
        <div className="p-3 hdhd"><GoBackButton />
            <div>
                <h1 className="h1 font-bold">MentalGrow Sounds
                </h1>
            </div>
        </div>
        <div className="container">
       
            {videos.length > 0 ? (
                <div className="videoPlayerContainer">
                    <div className="videoWrapper">
                        <h3 className="videoTitle">{videos[currentVideoIndex].tags}</h3>
                        <video key={videos[currentVideoIndex].id} controls className="videoPlayer">
                            <source src={videos[currentVideoIndex].videos.medium.url} type="video/mp4" />
                            Your browser does not support the video element.
                        </video>
                    </div>
                    
                    <div className="videoControls">
                        <button onClick={handlePrev} className="bg-slate-600 rounded text-zinc-300 p-2">Previous</button>
                        <button onClick={handleNext} className="bg-slate-600 rounded text-zinc-300 p-2">Next</button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen text-2xl">
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl skeleton" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] skeleton" />
                    <Skeleton className="h-4 w-[200px] skeleton" />
                  </div>
                </div>
              </div>
            )}
        </div>
        </>
    );
}
