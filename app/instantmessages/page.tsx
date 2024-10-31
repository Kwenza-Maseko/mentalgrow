import React from 'react'
import { FaRegEdit } from "@react-icons/all-files/fa/FaRegEdit";
import Link from 'next/link';
import TherapistMessages from '@/components/TherapistMessages';
import Image from 'next/image';
import TherapistList from '@/components/TherapistList';

const page = () => {
    return (
        <div className='p-4 relative'>
            {/*<TherapistMessages />*/}
            <TherapistList />
            <Link href={"/therapylists"} className="absolute left-6 top-6 p-2 rounded-full bg-zinc-200 text-slate-600">
                <FaRegEdit className='text-[23px]' />
            </Link>
        </div>
    )
}

export default page