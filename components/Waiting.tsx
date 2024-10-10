// pages/appointments.tsx
'use client'

import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/firebase';
import { useUser } from '@clerk/nextjs';
import { format } from 'date-fns';
import Image from 'next/image';
import { FaRegClock } from "@react-icons/all-files/fa/FaRegClock";
import { IoCalendarOutline } from "@react-icons/all-files/io5/IoCalendarOutline";

export interface Message {
    id: string;
    text: string;
    timestamp: {
        seconds: number;
    };
    formattedTimestamp?: string;
    userId: string;
    userImage: string;
    name: string;
    email: string;
    username: string;
    therapist: string;
}

const WaitingList = () => {
    const { user } = useUser();
    const [appointments, setAppointments] = useState<Message[]>([]);
    const truncateMessage = (text: string) => {
        return text.length > 10 ? text.slice(0, 30) + '...' : text;
    };
    useEffect(() => {
        if (!user) {
            console.log('No user found');
            return;
        }

        console.log('Current user ID:', user.id);

        const q = query(
            collection(db, 'appointment'),
            where('userId', '==', user.id.toString())
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                setAppointments([]);
                return;
            }

            const appointments: Message[] = snapshot.docs.map((doc) => {
                const data = doc.data();
                console.log('Document data:', data);

                const timestamp = data.timestamp?.toDate();
                return {
                    id: doc.id,
                    text: data.description,
                    timestamp: data.timestamp,
                    formattedTimestamp: timestamp ? format(timestamp, 'PPpp') : '',
                    userId: data.userId,
                    userImage: data.userImage,
                    name: data.name,
                    email: data.email,
                    username: data.username,
                    therapist: data.therapist
                };
            });
            setAppointments(appointments);
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <div className="flex w-full overflow-x-hidden gap-2 mb-3">
            <div className="flex overflow-x-scroll gap-2">
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <div key={appointment.id} className="bg-[#383868] p-4 rounded-2xl flex flex-col ">
                            <div className='flex flex-col gap-2'>
                               <div className='w-[180px]'><p className='text-[11pt]'>{truncateMessage(`${appointment.text} `)}</p></div>
                                <div className=''>
                                    {appointment.formattedTimestamp ? (
                                        <>
                                            <p className='text-[9pt] flex gap-2'>

                                                <IoCalendarOutline className='text-sm' />
                                                {appointment.formattedTimestamp.split(',')[0]}, {appointment.formattedTimestamp.split(',')[1]}
                                            </p> <br />
                                            <p className='text-[9pt] flex gap-2'>
                                                <FaRegClock className='text-sm' />
                                                {appointment.formattedTimestamp.split(',')[2]}
                                            </p>
                                        </>
                                    ) : (
                                        <p className='text-xs'>Timestamp not available</p>
                                    )}
                                </div>
                                <div>
                                    <div className="font-semibold mb-2">
                                        <p className='text-[11pt]'>Therapist Info</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div>
                                            <Image src={"/therapist.webp"} width={30} height={30} alt='therapist'
                                                className='rounded-full'
                                            />
                                        </div>
                                        <div>
                                            <p><span className="font-bold"></span>{appointment.therapist}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No Recent Appointments Found.</div>
                )}
            </div>
        </div>
    );
};

export default WaitingList;
