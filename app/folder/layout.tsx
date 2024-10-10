import DashboardLinks from "@/components/DashboardLinks";
import Greet from "@/components/Greet";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-svh overflow-y-hidden p-4">
            <Greet />
            <DashboardLinks />
            <div className="">
                {children}
            </div>
        </main>
    );
}
