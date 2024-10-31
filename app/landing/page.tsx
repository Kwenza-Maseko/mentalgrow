"use client";
import {  useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

const Page = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const addUserToFirestore = async () => {
      if (user) {
        try {
          console.log("User data:", user); // Debugging user data

          const userRef = doc(db, "users", user.id); // Use user ID as document ID

          await setDoc(userRef, {
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
            userId: user.id,
          }, { merge: true });

          alert("User created successfully!");
          console.log("User document created successfully");
        } catch (error) {
          console.error("Error creating user document:", error);
        }
      }
    };

    if (isLoaded && user) {
      console.log("User is loaded, attempting to add to Firestore");
      addUserToFirestore();
    } else {
      console.log("User not loaded yet or missing"); // Debugging load status
    }
  }, [user, isLoaded]);

  return (
    <div className="flex items-center justify-center screen">
      
    </div>
  );
};

export default Page;
