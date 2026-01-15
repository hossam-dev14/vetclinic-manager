import { Link, useLocation } from 'react-router-dom';
import { Home, Users, PawPrint, FileText, Stethoscope, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Logo } from '../ui';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Owners', href: '/owners', icon: Users },
  { name: 'Animals', href: '/animals', icon: PawPrint },
  { name: 'Consultations', href: '/consultations', icon: Stethoscope },
  { name: 'Documents', href: '/documents', icon: FileText },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#007BFF] text-white flex flex-col shadow-xl z-50">
      <div className="p-5 border-b border-[#3395FF]">
        <div className="flex items-center gap-3">
          {/* <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-[#007BFF] font-bold text-lg">V</span> 
          </div> */}
          <h1 className="text-xl font-bold leading-none">
            <Link
              to="/"
              className="flex items-center gap-3 py-2 rounded-xl text-white hover:text-[#E6F2FF] transition-colors w-full"
            >
              <Logo size={30} color="white" />
              <span className="font-medium text-md">VetClinic Manager</span>
            </Link>
          </h1>
          {/* <div>
            <p className="text-xs text-[#E6F2FF] opacity-80">Manager</p>
          </div> */}
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-white text-[#007BFF] shadow-md font-semibold"
                      : "text-white hover:bg-[#3395FF]"
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#3395FF]">
        <Link
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-[#3395FF] transition-colors w-full"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </Link>
      </div>
    </aside >
  );
}
