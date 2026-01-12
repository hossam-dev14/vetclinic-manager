import { User } from 'lucide-react';

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="bg-white border-b border-[#ECECEC] px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#000000]">{title}</h1>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#F8F8F8] rounded-lg">
            <User size={20} className="text-[#666666]" />
            <div className="text-sm">
              <p className="font-medium text-[#000000]">Dr. Admin</p>
              <p className="text-[#666666]">admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
