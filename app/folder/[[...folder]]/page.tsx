import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react';
import { folder_btn } from '@/constant';
import Image from 'next/image';
import Link from 'next/link';

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
        <div className='flex flex-col items-center justify-center mt-8 tht screen'>
            <h1 className='font-bold h1'>You are Interacting as {user?.fullName}</h1>
            {userEmail && adminEmails.includes(userEmail) ? (
                <div className='bg-slate-300 p-2 rounded'>You are registered as therapist. Therapist can not book an appointments <br />
                    Sign In with a different account to book appointment
                </div>
            ) :
                <div>
                    <p className="mb-4">Book A slot for your therapy </p>
                    {
                        folder_btn.map((item) => (
                            <Link href={`/${item.url}`} passHref key={item.id}>
                                <div className="buttons mb-3">
                                    <button className='btn py-2 px-4 '>
                                        <Image
                                            src={item.imageUrl}
                                            width={25}
                                            height={25}
                                            alt='icon'
                                            className='icon'
                                        />
                                        {item.name}
                                    </button>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            }

        </div>
    );
}

export default Folder;
