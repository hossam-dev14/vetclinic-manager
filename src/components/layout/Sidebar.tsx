import { Link, useLocation } from 'react-router-dom';
import { Home, Users, PawPrint, FileText, Stethoscope } from 'lucide-react';

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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#ECECEC] flex flex-col">
      <div className="p-6 border-b border-[#ECECEC]">
        <h1 className="text-2xl font-bold text-[#007BFF]">VetClinic</h1>
        <p className="text-sm text-[#666666]">Manager</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#E6F2FF] text-[#007BFF]'
                      : 'text-[#000000] hover:bg-[#F8F8F8]'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#ECECEC]">
        <p className="text-xs text-[#666666] text-center">
          © 2026 VetClinic Manager
        </p>
      </div>
    </aside>
  );
}
