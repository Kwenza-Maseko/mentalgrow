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

    const truncateMessage = (text: string) => {
        return text.length > 10 ? text.slice(0, 9) + '...' : text;
    };

    return (
        <div className='navbar'>
            <ul className='flex justify-between items-center p-3'>
                <div>
                    <Link href={"/"} className='flex gap-1 items-center'>
                        <li>
                            <Image
                                src={"/MentalGrow.png"}
                                width={80}
                                height={150}
                                alt='logo'
                                className=''
                            />
                        </li>
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

                            <div className="flex gap-2 items-center px-[5px] pr-3 text-white">
                                <li className='flex items-center p-1 rounded-full bg-zinc-400'>
                                    <UserButton />
                                </li>
                                <Link href={"/profile"}>
                                    <li className='font-semibold'>
                                        {user?.firstName && user?.lastName ? (
                                            <>
                                                {truncateMessage(`${user.firstName} ${user.lastName}`)}
                                            </>
                                        ) : (
                                            "@unknown"
                                        )}

                                        {userEmail && adminEmails.includes(userEmail) ? (
                                            <span className='font-light text-xs'>
                                                <br />
                                                Therapist
                                            </span>
                                        ) : (
                                            <span className='font-light text-xs'>
                                                <br />
                                                {user?.username ? `@${truncateMessage(user.username)}` : "@guest"}
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
