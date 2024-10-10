import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react';
import { folder_btn } from '@/constant';
import Image from 'next/image';
import Link from 'next/link';
import WaitingList from '@/components/Waiting';
import { FaCalendar } from "@react-icons/all-files/fa/FaCalendar"
import InputForm from '@/components/AppointmentForm';

const adminEmails = ["kwenzangcamane@gmail.com", "bayandamustang@gmail.com", "bmasinga32@gmail.com"];

const Folder = async () => {
    const { userId } = auth();
    const isAuth = !!userId;
    const user = await currentUser();

    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!isAuth) {
        redirect("/sign-in");
    }

    return (
        <div className='h-full flex flex-col justify-center'>
            <div className='h-[500px] overflow-y-hidden'>
                {userEmail && adminEmails.includes(userEmail) ? (
                    <div className='bg-slate-300 p-2 rounded'>You are registered as therapist. Therapist can not book an appointments <br />
                        Sign In with a different account to book appointment
                    </div>
                ) :
                    <div className='h-full overflow-y-scroll mt-4'>
                        <p className="text-[13pt] font-bold text-zinc-100 mb-4">Recent Appointments</p>
                        <div className="px-4">
                        <WaitingList />
                        </div>
                        <p className="text-[13pt] font-bold text-zinc-100 mb-4">Make An Appointment</p>
                        <div className="px-4">
                            
                        <InputForm />
                        </div>
                    </div>
                }

            </div>
        </div>
    );
}

export default Folder;
