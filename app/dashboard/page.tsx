import React from 'react'
import Image from 'next/image'

const page = () => {
    return (
        <div className="flex gap-3 justify-between w-full mt-4">
            <div className="w-full ">
                <Image
                    src={"/med.jpg"}
                    width={300}
                    height={300}
                    alt="itm"
                    className="imagess object-cover rounded-2xl"
                />
            </div>

            <div className="w-full">
                <div className="flex w-full flex-col gap-3">
                    <Image
                        src={"/meditation.jpg"}
                        width={100}
                        height={100}
                        alt="itm"
                        className="imagess h-[180px] object-cover rounded-2xl"
                    />
                    <Image
                        src={"/meditation.jpg"}
                        width={100}
                        height={100}
                        alt="itm"
                        className="imagess h-[180px] object-cover rounded-2xl"
                    />
                </div>
            </div>

        </div>
    )
}

export default page