// components/GoBackButton.tsx
'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";

const GoBackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <button onClick={goBack} className="back rounded-full align-center">
      <Image
        src={"/back.png"}
        width={10}
        height={10}
        alt="back"
        className="back"
      />
    </button>
  );
};

export default GoBackButton;
