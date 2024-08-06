'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useUser } from '@clerk/nextjs';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FormData {
    username: string;
    phone: string;
    email: string;
    occupation: string;
    location: string;
    userImage?: string;
}

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    phone: z.string().min(10, "Phone number must be at least 10 digits."),
    email: z.string().email("Invalid email address."),
    occupation: z.string().nonempty("Occupation is required."),
    location: z.string().nonempty("Location is required."),
});

export default function TherapistForm() {
    const [existingTherapist, setExistingTherapist] = useState<FormData | null>(null);
    const { user } = useUser();
    const form = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            phone: "",
            email: "",
            occupation: "",
            location: "",
        },
    });

    useEffect(() => {
        if (user) {
            const fetchTherapist = async () => {
                const q = query(collection(db, 'therapists'), where('userId', '==', user.id));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const therapistData = querySnapshot.docs[0].data() as FormData;
                    setExistingTherapist(therapistData);
                }
            };
            fetchTherapist();
        }
    }, [user]);

    async function onSubmit(data: FormData) {
        if (user) {
            try {
                await addDoc(collection(db, 'therapists'), {
                    ...data,
                    timestamp: serverTimestamp(),
                    userId: user.id,
                    userImage: user.imageUrl || '',
                    name: user.fullName || '',
                    email: user.emailAddresses.length > 0 ? user.emailAddresses[0].emailAddress : '',
                });
                toast({
                    title: "Therapist added successfully!",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                        </pre>
                    ),
                });
                form.reset();
            } catch (error) {
                console.error('Error submitting form: ', error);
                toast({
                    title: "Error adding therapist",
                    description: "There was an issue adding the therapist. Please try again.",
                    variant: "destructive",
                });
            }
        } else {
            toast({
                title: "User not authenticated",
                description: "Please log in to add a therapist.",
                variant: "destructive",
            });
        }
    }

    if (existingTherapist) {
        return (
            <div>
                <div>
                    <h1 className="h1 font-bold">Therapy Information
                    </h1>
                </div>
                <div className="therapist p-3">
                    <div className="flex gap-1 mb-2">

                        {existingTherapist.userImage && (
                            <img
                                src={existingTherapist.userImage}
                                alt="Therapist Image"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        )}

                        <div>
                            <div className='font-bold'>
                                {existingTherapist.username}
                            </div>
                            <div>
                                {existingTherapist.email}
                            </div>
                        </div>
                    </div>
                    <div>
                        {existingTherapist.phone}
                    </div>
                    <div>
                        {existingTherapist.occupation}
                    </div>
                    <div>
                        {existingTherapist.location}
                    </div>
                </div>
                <div className="appont mt-3 p-2 therapist">
                    <Link href={"/scheduledAppointments"}>
                        Check for Appointment
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mt-5 mb-5">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="tel" placeholder="Phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="email" placeholder="Email address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Occupation..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Location..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Add</Button>
            </form>
        </Form>
    );
}
