'use client';

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
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useUser } from '@clerk/nextjs';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  username: string;
  date: string;
  phone: string;
  email: string;
  description: string;
  therapist: string;
}

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  date: z.string().nonempty("Date is required."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  email: z.string().email("Invalid email address."),
  description: z.string().nonempty("Description is required."),
  therapist: z.string().nonempty("Therapist is required."),
});

const therapists = ['Josh Mastang', 'Bongani Masinga', 'Bayanda Mustang'];

export default function InputForm() {

  const route = useRouter();
  const { isSignedIn, user } = useUser();

  // Always call `useForm` at the top, outside any conditional logic
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: user?.username || "",
      date: "",
      phone: "",
      email: user?.emailAddresses?.[0]?.emailAddress || "",
      description: "",
      therapist: "",
    },
  });

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
    <div>
      {!isSignedIn ? (
        <p>Please sign in to book an appointment.</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full sm:w-1/3 space-y-3 mt-5 mb-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Username" {...field} />
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      {...field}
                    />
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Description..." {...field} />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a therapist" />
                      </SelectTrigger>
                      <SelectContent>
                        {therapists.map((therapist) => (
                          <SelectItem key={therapist} value={therapist}>
                            {therapist}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                  <p className="font-bold">Note: Check for available Therapists near your location.</p>
                </FormItem>
              )}
            />
            <Button type="submit">Make an Appointment</Button>
          </form>
        </Form>
      )}
    </div>
  );
}
