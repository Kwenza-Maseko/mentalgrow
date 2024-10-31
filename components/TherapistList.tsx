// components/Chat.tsx
'use client'

import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/firebase';
import { format } from 'date-fns';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { MdLocationOn } from "@react-icons/all-files/md/MdLocationOn";
import { RiPsychotherapyFill } from "@react-icons/all-files/ri/RiPsychotherapyFill";
import Link from 'next/link';

interface TherapistsData {
    id: string;
    timestamp: {
        seconds: number;
    };
    formattedTimestamp?: string;
    userId: string;
    userImage: string;
    name: string;
    email: string;
    username: string;
    location: string;
    occupation: string;
}
const TherapistList = () => {
    const { user } = useUser();
    const [therapists, setTherapists] = useState<TherapistsData[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'therapists'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const therapists: TherapistsData[] = snapshot.docs.map((doc) => {
                const data = doc.data();
                const timestamp = data.timestamp?.toDate();
                return {
                    id: doc.id,
                    timestamp: data.timestamp,
                    formattedTimestamp: timestamp ? format(timestamp, 'PPpp') : '',
                    userId: data.userId,
                    userImage: data.userImage,
                    name: data.name,
                    location: data.location,
                    email: data.email,
                    username: data.username,
                    occupation: data.occupation,
                };
            });
            setTherapists(therapists);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="h-full mt-16">
            <div className="flex flex-col gap-2'">
                <p className='mb-5'>Engage with therapists</p>
                {
                    therapists.map((therapist) => (
                        <Link href={`/engage/${therapist.id}`} key={therapist.id} className='flex justify-between hover:bg-slate-600'>
                            <div className='p-3 flex flex-col gap-2'>
                                <div className="flex gap-2 items-center">
                                    <Image
                                        src={therapist.userImage || "placeholder.png"}
                                        width={35}
                                        height={35}
                                        alt='therapist_img'
                                        className='rounded-full'
                                    />
                                    <div>
                                        <p className='font-semibold'>{therapist.name}</p>
                                        <p>@{therapist.username}</p>
                                    </div>
                                </div>
                                <div className='text-zinc-400'>
                                    <div className="flex gap-2 items-center">
                                        <MdLocationOn className='text-[20px]' />
                                        <p>{therapist.location || "location not found"}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <RiPsychotherapyFill className='text-[20px]' />
                                        <p>{therapist.occupation || "occuptation not found"}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default TherapistList;
