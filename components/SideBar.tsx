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
import { UserButton } from "@clerk/nextjs";

const icons = [
    { component: GoHome, label: 'Home', url: "/" },
    { component: IoChatbubblesOutline, label: 'Community', url: "/massage" },
    { component: IoFolderOpenOutline, label: 'folder', url: "/folder" },
    { component: RiMusic2Line, label: 'sounds', url: "/music" },
];


const SideBar = () => {
    const { userId } = useAuth();
    const { user, isLoaded } = useUser();
    const path = usePathname();
    const truncateMessage = (text: string) => {
        return text.length > 10 ? text.slice(0, 12) + '...' : text;
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-[200px] p-2 h-svh overflow-y-hidden sidebar fixed left-0">
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
                            <div className="flex items-center h-full">
                                <UserButton />
                            </div>
                            <div>
                                <div>
                                    <p className="font-bold text-[10pt]">
                                        {user?.firstName && user?.lastName ? (
                                            <>
                                                {truncateMessage(`${user.firstName} ${user.lastName}`)}
                                            </>
                                        ) : (
                                            "@unknown"
                                        )}</p>
                                    <p className="text-zinc-400 mb-2">
                                        {user?.username ? `@${truncateMessage(user.username)}` : "@guest"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <Link href={"/profile"}>
                                <button className="flex gap-2 rounded-md bg-gradient-to-r from-[#191953] to-[#64648f] font-bold px-3 capitalize text-zinc-200 mt-1 mb-2 w-full">
                                    Manage Account
                                </button>
                            </Link>
                        </div>
                        <div className="my-3 bg-zinc-500 h-[1px] w-full" />
                    </div>

                    {
                        icons.map((iconObj, index) => {
                            const IconComponent = iconObj.component;
                            return (
                                < React.Fragment key={index} >
                                    <Link href={iconObj.url} passHref>
                                        <div className="mb-1">
                                            <div className={`flex gap-2 items-center py-1 px-2 rounded capitalize ${iconObj.url === path ? 'bg-[#383868] text-zinc-200' : 'hover:bg-[#64648f] hover:text-zinc-200 '}`}>
                                                <IconComponent className={` ${iconObj.url === path ? 'text-zinc-200' : 'hover:text-zinc-200 '}`} style={{ fontSize: '21px' }} />
                                                {iconObj.label}
                                            </div>
                                        </div>
                                    </Link>
                                </React.Fragment>


                            );
                        })
                    }


                    <div className="my-3 bg-zinc-500 h-[1px] w-full" />
                    <SidebarChat />
                </>
            )
            }
        </div >
    );
}

export default SideBar;
