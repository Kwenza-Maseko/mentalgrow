import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex items-center justify-center screen">
      <SignUp afterSignUpUrl={"/"} />
    </div>
  );
};

export default Page;
