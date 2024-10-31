'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaAngleDown } from "@react-icons/all-files/fa/FaAngleDown";
import { BsPeople } from "@react-icons/all-files/bs/BsPeople";
import { BiMessageRounded } from "@react-icons/all-files/bi/BiMessageRounded";
import { IoMdHelpCircle } from "@react-icons/all-files/io/IoMdHelpCircle";
import { useState, useEffect } from 'react';

const SignUpNav = () => {
    const [dropdownMenu, setDropdownMenu] = useState(true);
    const [toolbox, setToolbox] = useState(true);
    return (
        <div className="p-3 py-5 flex justify-between gap-4 items-center mb-5 nav">
            <div className="logo flex gap-3">
                <ul className="logo flex gap-3 items-center">
                    <li>

                        <Image
                            src={"/MentalGrow.png"}
                            width={80}
                            height={150}
                            alt='logo'
                        />
                    </li>
                    <li>
                        <Link href={"/docs"}
                            onMouseEnter={() => setToolbox(true)}
                            onMouseLeave={() => setToolbox(false)}
                            className='relative'>
                            <IoMdHelpCircle className='text-[18pt]' />

                            {
                                toolbox && (
                                    <span className='p-1 bg-slate-600 absolute top-8'>Help</span>
                                )
                            }
                        </Link>
                    </li>
                    <li>
                        <div className='flex gap-1 items-center cursor-pointer relative'
                            onMouseEnter={() => setDropdownMenu(true)}
                            onMouseLeave={() => setDropdownMenu(false)}
                            onClick={() => setDropdownMenu((prev) => !prev)}>
                            <div>Company</div>
                            <div>
                                <FaAngleDown />
                            </div>

                            <div className='absolute pt-9 top-[0px] z-10'>
                                {dropdownMenu && (
                                    <div className='flex flex-col gap-1 p-1  rounded-lg w-[270px] rounded-md bg-[#383868] backdrop-blur-md shadow-2xl shadow-[#08094e] '>
                                        <Link href={"/aboutus"} className='hover:bg-slate-600 rounded-md p-2'>
                                            <div className="flex gap-2 items-center">
                                                <BsPeople className='text-[14pt]' />
                                                <p className='font-semibold text-[10pt]'>Developed by ElsonifyTech</p>
                                            </div>
                                            <p className='text-zinc-400'>Everything you need know about us.</p>
                                        </Link>

                                        <Link href={"/aboutus"} className='hover:bg-slate-600 rounded-md p-2'>
                                            <div className="flex gap-2 items-center">
                                                <BiMessageRounded className='text-[14pt]' />
                                                <p className='font-semibold'>Contact</p>
                                            </div>
                                            <p className='text-zinc-400'>Get in-touch with us.</p>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                    </li>
                </ul>
            </div>

            <div className="flex gap-4 items-center">
                <Link href={"/sign-in"} className='font-semibold'>
                    Sign in
                </Link>
                <Link href={"/sign-up"} className='p-2 rounded-md bg-[#383868] font-semibold'>
                    Sign up
                </Link>
            </div>
        </div>
    )
}

export default SignUpNav