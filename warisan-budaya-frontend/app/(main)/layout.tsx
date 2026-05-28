export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="bg-[#FFFFF] min-h-screen">
                {children}
            </main>
    );
}
