'use client';

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { usePathname } from "next/navigation";
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

const Footer = () => {
    const { userId } = useAuth();
    const path = usePathname();

    return (
        <div className="flex justify-between bg-white px-3 py-2 fixed bottom-0 right-0 left-0 md:hidden z-50">
            {!userId ? (
                <>
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

                </>
            ) : (
                <>
                    {
                        icons.map((iconObj, index) => {
                            const IconComponent = iconObj.component;
                            return (
                                < React.Fragment key={index} >
                                    <Link href={iconObj.url} passHref>
                                        <div className="mb-1">
                                            <div className={`flex flex-col gap-2 items-center p-1 rounded capitalize ${iconObj.url === path ? 'bg-slate-500 text-zinc-200' : 'hover:bg-slate-500 hover:text-zinc-200 '}`}>
                                                <IconComponent className={` ${iconObj.url === path ? 'text-zinc-200' : 'hover:text-zinc-200 '}`} style={{ fontSize: '21px' }} />
                                                {iconObj.label}
                                            </div>
                                        </div>
                                    </Link>
                                </React.Fragment>


                            );
                        })
                    }

                </>
            )}
        </div>
    );
}

export default Footer;
