import TherapistForm from "@/components/TherapistForm";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GoBackButton from "@/components/GoBackButton";

const adminEmails = ["kwenzangcamane@gmail.com", "bayandamustang@gmail.com", "bmasinga32@gmail.com"];

export default async function Page() {
  const { userId } = auth(); // Await here to ensure the auth is resolved
  const user = await currentUser(); // Await here to ensure the user is fetched
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  if (userEmail && !(adminEmails.includes(userEmail))) {
    redirect("/");
  }

  return (
    <div className='screen'>
      <div className="p-3 hdhd"><GoBackButton />
        <div>
          <h1 className="h1 font-bold">Therapist Info Card
          </h1>
        </div>
      </div>

      <div className='flex mt-2 justify-center'>
        <TherapistForm />
      </div>
    </div>
  );
}
