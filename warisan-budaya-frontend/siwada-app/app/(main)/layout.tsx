import { Navbar1 } from "@/components/navbar1";
import { Footer } from "@/components/footer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <header>
                <Navbar1 />
            </header>
            <main className="bg-[#FFFFF] min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
}
