import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from 'next/navigation';
import AppointmentForm from "@/components/AppointmentForm";
import { useRouter } from 'next/navigation';
import GoBackButton from "@/components/GoBackButton";

const page = async () => {

    const { userId } = auth();
    const isAuth = !!userId;
    const user = await currentUser();

    if (!isAuth) {
        redirect("/sign-in");
    }
    return (
        <>
            <div className="p-3 hdhd pb-[5rem]"><GoBackButton />
                <div>
                    <h1 className="h1 font-bold">Book an Appointment
                    </h1>
                </div>
            </div>

            <div className="flex items-center justify-center screen">
                <AppointmentForm />
            </div>
        </>
    )

}

export default page
