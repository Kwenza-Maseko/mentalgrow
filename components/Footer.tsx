'use client';

import Image from "next/image";
import Link from "next/link";
import { footer } from "@/constant";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
    const { userId } = useAuth();
    const path = usePathname();

    return (
        <div className="flex justify-between bg-white px-2 fixed bottom-0 right-0 left-0">
            {!userId ? (
                <>
                    {footer.map((item) => (
                        <React.Fragment key={item.id}>
                            {item.name === "message" ? (
                                <div className="hidden" />
                            ) : (
                                <Link href={item.url} passHref>
                                    <div className="itemsss">
                                    <div className={`${item.url === path ? 'bg-slate-600' : 'hover:bg-zinc-600'}"bg-zinc-600"`}>
                                            <Image
                                                src={item.imageUrl}
                                                width={30}
                                                height={30}
                                                alt="itm"
                                                className="icons"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </React.Fragment>
                    ))}
                </>
            ) : (
                <>
                    {footer.map((item) => (
                        <React.Fragment key={item.id}>
                            <Link href={item.url} passHref>
                                <div className="itemsss">
                                    <div className={` p-2 flex flex-col justify-center items-center rounded capitalize ${item.url === path ? 'bg-slate-600 text-zinc-200' : 'hover:bg-slate-600 hover:text-zinc-200 '}`}>
                                        <Image
                                            src={item.imageUrl}
                                            width={30}
                                            height={30}
                                            alt="itm"
                                            className="icons"
                                        />
                                    {item.name}
                                    </div>
                                </div>
                            </Link>
                        </React.Fragment>
                    ))}
                </>
            )}
        </div>
    );
}

export default Footer;
