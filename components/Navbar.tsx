import React from 'react'
import Link from 'next/link'
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';

const Navbar = () => {
    const { userId } = auth();
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
                            className='logo rounded'/>
                        </li>
                        <p className='logo_name'>MentalGrow</p>
                    </Link>
                </div>

                <div className='flex gap-6 items-center'>
                    {!userId ? (
                        <>
                            <Link href={"/sign-in"}>
                                <li>Login</li>
                            </Link>
                            <Link href={"/sign-up"}>
                                <li>Sign Up</li>
                            </Link>
                        </>) : (<>
                            <Link href={"/profile"}>
                                <li>Profile</li>
                            </Link>
                            <li className='flex items-center'>
                                <UserButton />
                            </li>

                        </>)}
                    <>
                    </>
                </div>
            </ul>
        </div>
    )
}

export default Navbar