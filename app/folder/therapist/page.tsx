import React from 'react';
import { therapist } from '@/constant';
import Image from 'next/image';
import Link from 'next/link';
import GoBackButton from '@/components/GoBackButton';

const page = () => {
    return (
        <div className='p-3 h-[500px] overflow-y-hidden'>
            <div className="overflow-y-scroll h-full">

                {therapist.map((therapist, index) => (
                    <div key={therapist.id} className='therapist p-5 mb-2'>
                        <div className="flex gap-1 mb-2">
                            <Image src={therapist.imageUrl} width={40} height={40} alt='therapist' className='therapist_img rounded-full' />
                            <div>
                                <div className='font-bold'>
                                    {therapist.name}
                                </div>
                                <div>
                                    {therapist.email}
                                </div>
                            </div>
                        </div>
                        <div>
                            {therapist.occipation}
                        </div>
                        <div className='mb-5'>
                            {therapist.location}
                        </div>
                        <div className={`status ${therapist.status === 'Available' ? 'available font-bold' : 'fully-booked font-bold'}`}>
                            {therapist.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default page;
