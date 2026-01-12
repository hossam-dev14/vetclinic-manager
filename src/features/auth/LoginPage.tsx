import { LoginForm } from './components/LoginForm';

export function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Illustration Area */}
      <div className="hidden lg:flex flex-col justify-between bg-[#F8F9FA] p-12">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-[#007BFF] rounded-lg"></div>
          <span className="text-xl font-bold text-[#000000]">VetClinic Manager</span>
        </div>
        
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="relative w-full max-w-md aspect-square bg-[#E6F2FF] rounded-full flex items-center justify-center mb-8">
            {/* Placeholder for illustration */}
            <div className="text-[#007BFF] text-6xl">🐕</div>
          </div>
          <h2 className="text-3xl font-bold text-[#000000] mb-4 text-center">
            Manage your clinic with ease
          </h2>
          <p className="text-[#666666] text-center max-w-md">
            Streamline your veterinary practice with our comprehensive management solution.
          </p>
        </div>

        <div className="text-sm text-[#666666]">
          © 2026 VetClinic Manager. All rights reserved.
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <LoginForm />
      </div>
    </div>
  );
}