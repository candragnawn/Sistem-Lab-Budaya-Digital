import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Sidebar />
      <TopNav />
      <main className="ml-60 mt-12 p-4 min-h-[calc(100vh-3rem)]">
        {children}
      </main>
    </div>
  );
}
