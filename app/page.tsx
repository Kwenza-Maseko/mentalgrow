import Image from "next/image";
import Link from "next/link";
import { items } from "@/constant";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default async function Home() {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect("/sign-in");
  }

  return (
    <div className="background-bg ">
      <div className="content grid_display">
        <div>
          <Image
            src={"/hero.webp"}
            width={200}
            height={200}
            alt="hero_img"
            className="hero_img"
          />
        </div>
        <div>
          <h1 className="mb-1 font-bold">Mental Grow</h1>
          <p>MentalGrow is an innovative app designed to support mental well-being by offering a comprehensive suite of features. Users can conveniently book therapy sessions with qualified therapists, ensuring they receive personalized and professional support. Additionally, the app provides a streaming service for meditation sounds, helping users to relax and meditate effectively. To foster a sense of community, MentalGrow includes live chat functionality, enabling users to connect, share experiences, and support each other in real-time.</p>

          {!userId ? (
            <>
              <div className="mt-6">
                <Link href={"/sign-in"}
                  className="get_started_btn py-2 px-5 font-bold">
                  Get Started
                </Link>
              </div>
            </>) : (<>
            </>)}
        </div>

      </div>

      <div className="gallary mt-4">
        {items.map((item, index) => (
          <div className="itemsss" key={index}>
            <div className="actual_itm">
              <Image
                src={item.imageUrl}
                width={100}
                height={100}
                alt="itm"
                className="itms"
              />
              <p className="item_p font-bold">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
