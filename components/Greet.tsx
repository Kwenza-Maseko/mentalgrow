import { currentUser } from "@clerk/nextjs/server";

const getGreeting = (): string => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Good afternoon";
  } else if (currentHour >= 17 && currentHour < 21) {
    return "Good evening";
  } else {
    return "Good night";
  }
};

export default async function Greet() {
  const greeting = getGreeting();
  const user = await currentUser();

  return (
    <div>
      <p className="capitalize text-[18pt] font-bold mb-3">
        {greeting}, {user?.firstName}
      </p>
    </div>
  );
};

