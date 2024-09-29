'use client';

import Image from "next/image";
import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import React from "react";
import { usePathname } from "next/navigation";
import SidebarChat from "./SidebarChat";
import { GoHome } from "@react-icons/all-files/go/GoHome";
import { IoChatbubblesOutline } from "@react-icons/all-files/io5/IoChatbubblesOutline";
import { IoFolderOpenOutline } from "@react-icons/all-files/io5/IoFolderOpenOutline";
import { RiMusic2Line } from "@react-icons/all-files/ri/RiMusic2Line";

const icons = [
    { component: GoHome, label: 'Home', url: "/" },
    { component: IoChatbubblesOutline, label: 'Community', url: "/massage" },
    { component: IoFolderOpenOutline, label: 'folder', url: "/folder" },
    { component: RiMusic2Line, label: 'music', url: "/music" },
];


const SideBar = () => {
    const { userId } = useAuth();
    const { user, isLoaded } = useUser();
    const path = usePathname();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-[200px] hidden md:block p-2 bg-zinc-200 h-svh overflow-y-hidden sidebar">
            {!userId ? (
                <>
                    {icons.map((iconObj, index) => {
                        const IconComponent = iconObj.component;
                        return (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <Link href={`${iconObj.url}`}>
                                    <div className={`${path === iconObj.url ? "bg-zinc-900" : "hover:bg-zinc-900"} "flex justify-center px-2 py-1 rounded "`}>
                                        <IconComponent className="text-zinc-600" style={{ fontSize: '24px', color: "red" }} />
                                        <p className="text-zinc-300">{iconObj.label}</p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </>
            ) : (
                <>
                    {/* User Profile Section */}
                    <div className="mt-1 text-zinc-300 flex md:block gap-2">
                        <div className='flex items-start gap-2 mb-3'>
                            <Image
                                src={user?.imageUrl || "/default-profile.png"}
                                alt="User Profile Image"
                                width={35}
                                height={35}
                                style={{ borderRadius: '50%' }}
                            />

                            <div>
                                <div>
                                    <p className="text-zinc-700 font-bold text-[10pt]">@{user?.username}</p>
                                    <p className="text-zinc-600 mb-2">MentalGrow Member</p>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <Link href={"/profile"}>
                                <button className="flex gap-2 rounded-md bg-gradient-to-r from-slate-700 to-slate-950 font-bold px-3 capitalize text-zinc-200 mt-1 mb-2 w-full">
                                    Manage Account
                                </button>
                            </Link>
                        </div>
                        <div className="mb-3 bg-white h-[1px] w-full" />
                    </div>

                    {
                        icons.map((iconObj, index) => {
                            const IconComponent = iconObj.component;
                            return (
                                < React.Fragment key={index} >
                                    <Link href={iconObj.url} passHref>
                                        <div className="mb-1">
                                            <div className={`flex gap-2 items-center p-1 rounded capitalize ${iconObj.url === path ? 'bg-slate-500 text-zinc-200' : 'hover:bg-slate-500 hover:text-zinc-200 '}`}>
                                                <IconComponent className={` ${iconObj.url === path ? 'text-zinc-200' : 'hover:text-zinc-200 '}`} style={{ fontSize: '21px' }} />
                                                {iconObj.label}
                                            </div>
                                        </div>
                                    </Link>
                                </React.Fragment>


                            );
                        })
                    }


                    <div className="mb-3 bg-white h-[1px] w-full" />
                    <SidebarChat />
                </>
            )
            }
        </div >
    );
}

export default SideBar;
