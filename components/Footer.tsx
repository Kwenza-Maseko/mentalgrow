import Image from "next/image";
import Link from "next/link";
import { footer } from "@/constant";
import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";

const Footer = () => {
    const { userId } = auth();
    return (<div className="flex justify-between bg-white px-2">


        {!userId ? (
            <>  {footer.map((item) => (
                <React.Fragment key={item.id}>
                    {item.name === "message" ? (
                        <div className="hidden" />
                    ) : (
                        <Link href={`/${item.url}`} passHref>
                            <div className="itemsss">
                                <div className="actual_itm">
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

            </>) : (<>

                {footer.map((item) => (
                    <React.Fragment key={item.id}>
                        <Link href={`/${item.url}`} passHref>
                            <div className="itemsss">
                                <div className="actual_itm">
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
                    </React.Fragment>
                ))}
            </>)}

    </div>
    )
}

export default Footer