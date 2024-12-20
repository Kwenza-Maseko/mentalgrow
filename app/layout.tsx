import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  ClerkLoaded,
  ClerkLoading
} from '@clerk/nextjs'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton"
import SideBar from "@/components/SideBar";
import { SignedIn } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MentalGrow App",
  description: "MentalGrow is an innovative app designed to support mental well-being by offering a comprehensive suite of features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ClerkLoading>
            <div className="flex items-center space-x-4 p-3">
              <Skeleton className="h-12 w-12 rounded-full skeleton" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] skeleton" />
                <Skeleton className="h-4 w-[200px] skeleton" />
              </div>
            </div>

            <div className="flex items-center justify-center h-screen text-2xl">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl skeleton" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px] skeleton" />
                  <Skeleton className="h-4 w-[200px] skeleton" />
                </div>
              </div>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <div className="mx-auto">
              <div className="flex">
                <SignedIn>
                  <div className=" hidden lg:block  w-[234px]">
                    <SideBar />
                  </div>
                  <div className="">
                  </div>
                </SignedIn>
                <div className="flex flex-col h-svh overflow-y-hidden w-full lg:pb-0  pb-[5rem]">
                  <div className="md:hidden"><Navbar /></div>
                  <div className="h-full overflow-y-scroll">{children}</div>
                  <SignedIn>
                    <Footer />
                  </SignedIn>
                </div>
              </div>
            </div>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
