import type { ReactNode } from 'react';
import { Sidebar } from '../navigation/Sidebar';
import { Navbar } from '../navigation/Navbar';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Sidebar />
      <div className="ml-64">
        <Navbar title={title} />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
