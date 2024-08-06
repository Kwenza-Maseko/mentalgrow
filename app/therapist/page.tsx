import React from 'react';
import { therapist } from '@/constant';
import Image from 'next/image';
import Link from 'next/link';
import GoBackButton from '@/components/GoBackButton';

const page = () => {
    return (
        <div className='screen p-3'>
            <div className="p-3 hdhd"><GoBackButton />
                <div>
                    <h1 className="h1 font-bold">MentalGrow Therapist
                    </h1>
                </div>
            </div>
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
    );
};

export default page;
