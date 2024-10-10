'use client';

import GoBackButton from '@/components/GoBackButton';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { MdSkipNext } from "@react-icons/all-files/md/MdSkipNext";
import { GiMeditation } from "@react-icons/all-files/gi/GiMeditation";

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
                setVideos(data.hits);
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

    const handleVideoSelect = (index: number) => {
        setCurrentVideoIndex(index);
    };

    return (
        <>
            <div className="container h-svh">
                {videos.length > 0 ? (
                    <div className="">
                        {/* Current Video Section */}
                        <div className="flex gap-2 h-[200px]">
                            <video key={videos[currentVideoIndex].id} controls className="w-1/3 rounded-lg">
                                <source src={videos[currentVideoIndex].videos.medium.url} type="video/mp4" />

                                Your browser does not support the video element.
                            </video>
                            <div>
                                <h3 className="text-[13pt] font-semibold capitalize">{videos[currentVideoIndex].tags}</h3>
                            </div>
                        </div>

                        {/* Video Control Buttons */}
                        <div className="videoControls">
                            <button onClick={handlePrev} className="bg-slate-600 rotate-180 rounded-full text-zinc-100 text-[20px] p-2"><MdSkipNext /></button>
                            <button onClick={handleNext} className="bg-slate-600 rounded-full text-zinc-100 text-[20px] p-2"><MdSkipNext /></button>
                        </div>

                        {/* Playlist Section */}
                        <div className="playlist mt-5 h-[380px] overflow-y-hidden">
                            <h3 className="text-[14pt] font-bold mb-2">Playlist</h3>
                            <div className="overflow-y-scroll h-full p-1">
                                <ul className="flex flex-col gap-2 mt-2">
                                    {videos.map((video, index) => (
                                        <div className='cursor-pointer my-2'
                                            key={video.id}
                                            onClick={() => handleVideoSelect(index)}>

                                            <div className={`${index === currentVideoIndex ? 'bg-slate-800  text-zinc-100' : ' text-zinc-400'} items-center flex w-full gap-2  hover:bg-slate-800 rounded-full`}>
                                                <div className='p-3 bg-slate-600 rounded-full text-zinc-100'>
                                                    <GiMeditation />
                                                </div>
                                                <li className='capitalize'>
                                                    {video.tags}
                                                </li>
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-dvh text-2xl">
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
