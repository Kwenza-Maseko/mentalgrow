"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SignInPage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  {/*  useEffect(() => {
    const addUserToFirestoreIfNotExists = async () => {
      if (user) {
        const userRef = doc(db, "users", user.id); // Reference to user's document
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          await setDoc(userRef, {
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
            userId: user.id,
          });
        }
      }
    };

    if (isLoaded && user) {
      addUserToFirestoreIfNotExists();
    }
  }, [user, isLoaded, router]);

 */}
  return (
    <div className="flex items-center justify-center screen">
      <SignIn afterSignOutUrl={"/"} />
    </div>
  );
};

export default SignInPage;
