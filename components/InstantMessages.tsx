import React from 'react'
import Link from 'next/link'
import { RiMessage2Line } from "@react-icons/all-files/ri/RiMessage2Line";

const InstantMessages = () => {
    return (
        <Link href={"/instantmessages"} className='p-2 fixed right-6 top-6 z-10 bg-zinc-200 rounded-full'>
            <RiMessage2Line className='text-[23px] text-slate-600' />
        </Link>
    )
}

export default InstantMessages