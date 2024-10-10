'use client';

import Link from "next/link";
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
    { component: RiMusic2Line, label: 'sounds', url: "/music" },
];

const Footer = () => {
    const path = usePathname();

    return (
        <div className="flex justify-between bg-[#070229bb] backdrop-blur-md p-2 fixed bottom-0 right-0 left-0 md:hidden z-50">
            {
                icons.map((iconObj, index) => {
                    const IconComponent = iconObj.component;
                    return (
                        <Link href={iconObj.url} passHref key={index}>
                            <div className="icon-label">
                                <div className={`flex flex-col gap-1 items-center capitalize`}>
                                    <div className={`${iconObj.url === path ? 'bg-slate-500 text-white' : 'hover:bg-slate-600 hover:text-white'} text-[21px] p-2 rounded-full icon-container`}>
                                        <IconComponent className={`text-[25px]`} />
                                    </div>
                                   <p className={`${iconObj.url === path ? 'font-semibold text-white' : 'hover:text-white'} text-[9pt]`}>{iconObj.label}</p> 
                                </div>
                            </div>
                        </Link>
                    );
                })
            }
        </div>
    );
}

export default Footer;
