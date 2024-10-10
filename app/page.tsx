import Image from "next/image";
import Link from "next/link";
import { items } from "@/constant";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { FaCalendar } from "@react-icons/all-files/fa/FaCalendar";
import { BsMusicNoteBeamed } from "@react-icons/all-files/bs/BsMusicNoteBeamed";
import { GiNightSleep } from "@react-icons/all-files/gi/GiNightSleep";
import { HiEmojiSad } from "@react-icons/all-files/hi/HiEmojiSad";
import { RiDashboardFill } from "@react-icons/all-files/ri/RiDashboardFill";
import { GiMeditation } from "@react-icons/all-files/gi/GiMeditation";
import Discover from "@/components/Discover";

const getGreeting = (): string => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "good afternoon";
  } else if (currentHour >= 17 && currentHour < 21) {
    return "good evening";
  } else {
    return "good night";
  }
};
export default async function Home() {
  const greeting = getGreeting();
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect("/sign-in");
  }

  return (
    <div className=" ">
      <div
        className={`content z-0 ${greeting === "good morning" ? "sunrise" : greeting === "good afternoon" ? "afternoon" : greeting === "good evening" ? "evening" : "night"}`}>

        <div className="z-10 relative">
          <p className="capitalize text-[18pt] font-bold mb-3">{greeting}, {user?.firstName}</p>

          <div className="bg-img-banner rounded-xl lg:rounded-[35px] z-0 sm:mx-16 p-4 lg:p-8">
            <div className="flex flex-col gap-5 justify-center items-center z-10">
              <div><p className="text-[15pt] font-bold text-zinc-100">MentalGrow</p></div>
              <div>
                <p className="text-zinc-100">MentalGrow is an innovative app designed to support mental well-being by offering a comprehensive suite of features. Users can conveniently book therapy sessions with qualified therapists, ensuring they receive personalized and professional support. Additionally, the app provides a streaming service for meditation sounds, helping users to relax and meditate effectively.</p>
              </div>
              <div className="flex justify-center items-center gap-5 text-zinc-600">
                <Link href={"/folder"} className="rounded-lg flex  text-zinc-100  gap-2 items-center p-3 bg-[#5f5f80] border-[2px] border-solid border-[#6d0d8a10]">
                  <FaCalendar className="text-[14pt]" /> Appointments
                </Link>

                <Link href={"/music"}  className="rounded-lg flex gap-2 text-zinc-100 items-center p-3 border-[2px] border-solid border-zinc-100 text-[#6d0d8a]">
                  <BsMusicNoteBeamed className="text-[14pt]" /> Sounds
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="flex flex-col gap-4 justify-center p-4">
        <div><p className="text-[15pt] font-bold text-zinc-100">Discover</p></div>
          <Discover/>
        </div>

      </div>
  );
}
