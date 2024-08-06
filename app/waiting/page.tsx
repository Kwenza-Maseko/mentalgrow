// pages/appointments.tsx
'use client'

import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/firebase';
import { useUser } from '@clerk/nextjs';
import { format } from 'date-fns';
import GoBackButton from '@/components/GoBackButton';

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

const AppointmentsPage = () => {
    const { user } = useUser();
    const [appointments, setAppointments] = useState<Message[]>([]);

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
        <div className="appointments-container screen">
            <div className="p-3 hdhd"><GoBackButton />
                <div>
                    <h1 className="h1 font-bold">Your Appointments
                    </h1>
                </div>
            </div>
            <div className="appointments-list">
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <div key={appointment.id} className="appointment">
                            <div className="appointment-header">
                                <img
                                    src={appointment.userImage}
                                    alt="User Avatar"
                                    className="user-avatar rounded-full"
                                    width={40}
                                    height={40}
                                />
                                <div className="user-info">
                                    <div className="user-name">{appointment.name}</div>
                                    <div className="user-em">{appointment.email}</div>
                                    <div className="user-username">{appointment.username}</div>
                                </div>
                            </div>
                            <div className="appointment-text">{appointment.text}</div>
                            <div className="appointment-text"><span className="font-bold">Therapist Booked: </span>{appointment.therapist}</div>
                            <div className="appointment-timestamp">{appointment.formattedTimestamp}</div>
                        </div>
                    ))
                ) : (
                    <div>No appointments found.</div>
                )}
            </div>
        </div>
    );
};

export default AppointmentsPage;
