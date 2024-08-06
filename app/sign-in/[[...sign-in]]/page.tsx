'use client';

import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const adminEmails = ["kwenzangcamane@gmail.com", "vuno14kuhle@gmail.com"]; 

const Page = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("useEffect triggered");
    console.log("isLoaded:", isLoaded); 
    console.log("User object:", user); 

    if (isLoaded) {
      console.log("Checking user authentication");
      
      if (user) {
        console.log("User is loaded and authenticated");
        
        const userEmail = user.primaryEmailAddress?.emailAddress;
        console.log("User email:", userEmail);

        const isAdmin = adminEmails.some(email => email === userEmail);
        
        if (userEmail && isAdmin) {
          console.log("User is an admin. Redirecting to /therapistadmin");
          router.push("/therapistadmin");
        } else {
          console.log("User is not an admin. Redirecting to /");
          router.push("/"); 
        }
      } else {
        console.log("User object is null or undefined");
      }
    } else {
      console.log("User not loaded or not authenticated");
    }
  }, [user, isLoaded, router]);

  return (
    <div className="flex items-center justify-center screen">
      <SignIn afterSignInUrl="/" />
    </div>
  );
};

export default Page;
