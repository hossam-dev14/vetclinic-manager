import { Link } from 'react-router-dom';
import { RegisterForm } from './components/RegisterForm';
import { Logo } from '../../components/ui';

export function RegisterPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-[#F8F9FA] p-12">
        <div className="flex items-center gap-2">
          <Logo size={30} color="blue" />
          <span className="text-xl font-bold text-[#000000]">VetClinic Manager</span>
          <h1 className="text-xl font-bold leading-none">
            <Link
              to="/"
              className="flex items-center gap-3 py-2 rounded-xl text-white hover:text-[#E6F2FF] transition-colors w-full"
            >
            </Link>
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center flex-1">
          <div className="w-full max-w-md aspect-square  flex items-center justify-center">
            <img
              src="/assets/login-page.png"
              alt="Veterinarian examining a dog in a vet clinic"
              className="h-full w-full object-contain p-8"
            />
          </div>
          <h2 className="text-3xl font-bold text-[#000000] mb-4 text-center">
            Manage your clinic with ease
          </h2>
          <p className="text-[#666666] text-center max-w-md">
            Streamline your veterinary practice with our comprehensive management solution.
          </p>
        </div>

        {/* <div className="text-sm text-[#666666]">
              © 2026 VetClinic Manager. All rights reserved.
            </div> */}
      </div>

      <div className="flex items-center justify-center p-8 bg-white">
        <RegisterForm />
      </div>
    </div>
  );
}

