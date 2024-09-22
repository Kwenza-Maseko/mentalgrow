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
import { Select } from "@/components/ui/select"; 
import { toast } from "@/components/ui/use-toast";
import { useUser } from '@clerk/nextjs';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  date: string;
  phone: string;
  email: string;
  description: string;
  therapist: string; // New field for therapist selection
}

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  date: z.string().nonempty("Date is required."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  email: z.string().email("Invalid email address."),
  description: z.string().nonempty("Description is required."),
  therapist: z.string().nonempty("Therapist is required."), // Validation for the new field
});

const therapists = ['Josh Mastang', 'Bongani Masinga', 'Bayanda Mustang' ];

export default function InputForm() {
  
  const route = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      date: "",
      phone: "",
      email: "",
      description: "",
      therapist: "",
    },
  });

  const { user } = useUser();

  const today = new Date().toISOString().split('T')[0];
  const oneMonthFromToday = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0];

  async function onSubmit(data: FormData) {
    if (user) {
      try {
        await addDoc(collection(db, 'appointment'), {
          ...data,
          timestamp: serverTimestamp(),
          userId: user.id,
          userImage: user.imageUrl || '',
          name: user.fullName || '',
          email: user.emailAddresses.length > 0 ? user.emailAddresses[0].emailAddress : '',
        });
        toast({
          title: "Appointment booked successfully!",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        });
        form.reset();
        route.push("/waiting");
      } catch (error) {
        console.error('Error submitting form: ', error);
        toast({
          title: "Error booking appointment",
          description: "There was an issue booking your appointment. Please try again.",
          variant: "destructive", 
        });
      }
    } else {
      toast({
        title: "User not authenticated",
        description: "Please log in to book an appointment.",
        variant: "destructive",
      });
    }
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
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Select a date"
                  min={today}
                  max={oneMonthFromToday}
                  {...field}
                />
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="therapist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a Therapist</FormLabel>
              <FormControl>
                <select {...field} className="form-select">
                  <option value="">Select a therapist</option>
                  {therapists.map((therapist) => (
                    <option key={therapist} value={therapist}>
                      {therapist}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
              <p className="font-bold">Note: Check for available Therapist near your Location</p>
            </FormItem>
          )}
        />
        <Button type="submit">Make an Appointment</Button>
      </form>
    </Form>
  );
}
