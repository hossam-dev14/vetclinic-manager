import { User } from 'lucide-react';

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="bg-white border-b border-[#ECECEC] px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl px-3 py-2 font-semibold text-[#555555] bg-[#E6F2FF] rounded-lg ">Dashboard {/* {title} */}</h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 ">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6F2FF] overflow-hidden md:h-9 md:w-9">
              {/* <img
                src="/assets/user-avatar.svg"
                alt="Dr. Admin avatar"
                className="h-7 w-7 rounded-full object-cover md:h-8 md:w-8"
              /> */}
              <User className="h-5 w-5 text-[#3366CC] md:h-6 md:w-6" />
            </div>
            <div className="hidden text-sm sm:block">
              <p className="font-medium text-[#666666]">Dr. Admin</p>
              <p className="text-[#666666]">admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
