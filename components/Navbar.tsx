import React from 'react';
import Link from 'next/link';
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from "next/navigation";


const adminEmails = ["kwenzangcamane@gmail.com", "bayandamustang@gmail.com", "bmasinga32@gmail.com"];

export default async function Navbar() {
    const { userId } = auth();
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    return (
        <div className='navbar'>
            <ul className='flex justify-between py-4 px-6'>
                <div>
                    <Link href={"/"} className='flex gap-1 items-center'>
                        <li>
                            <Image
                                src={"/logo.jpg"}
                                width={40}
                                height={40}
                                alt='logo'
                                className='logo rounded-full'
                            />
                        </li>
                        <p className='logo_name hidden sm:block'>MentalGrow</p>
                    </Link>
                </div>

                <div className='flex gap-2 items-center'>
                    {!userId ? (
                        <>
                            <Link href={"/sign-in"}>
                                <li>Login</li>
                            </Link>
                            <Link href={"/sign-up"}>
                                <li>Sign Up</li>
                            </Link>
                        </>
                    ) : (
                        <>
                            {userEmail && adminEmails.includes(userEmail) && (
                                <Link href={"/therapistadmin"} className='border border-slate-500 rounded-full p-2 text-zinc-900 flex gap-1 items-center'>
                                    <li className='hidden md:block'>Get Bookings</li>


                                    <Image
                                        src={"/list.jpg"}
                                        width={25}
                                        height={25}
                                        alt='logo'
                                        className='logo rounded-full'
                                    />
                                </Link>
                            )}

                            <div className="bg-slate-600 p-1 rounded-full flex gap-2 items-center px-2 pr-3 text-zinc-200 shadow-lg">
                                <li className='flex items-center'>
                                    <UserButton />
                                </li>
                                <Link href={"/profile"}>
                                    <li>{user?.firstName} {user?.lastName}


                                        {userEmail && adminEmails.includes(userEmail) && (
                                            <span className='text-zinc-300 text-xs'>
                                                <br />
                                                Therapist
                                            </span>
                                        )}


                                    </li>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </ul>
        </div>
    );
}
