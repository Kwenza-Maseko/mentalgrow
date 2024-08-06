'use client';
import { SignUp, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const adminEmails = ["kwenzangcamane@gmail.com"]; 

const Page = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      const userEmail = user.primaryEmailAddress?.emailAddress;
      if (userEmail && adminEmails.includes(userEmail)) {
        router.push("/therapistadmin");
      } else {
        router.push("/"); // Redirect to home or another page for non-admin users
      }
    }
  }, [user, isLoaded, router]);

  return (
    <div className="flex items-center justify-center screen">
      <SignUp afterSignOutUrl={"/"} />
    </div>
  );
};

export default Page;


