import DashboardLinks from "@/components/DashboardLinks";
import Greet from "@/components/Greet";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="m-4">
            <Greet />
            <DashboardLinks />
            {children}
        </div>
    );
}
