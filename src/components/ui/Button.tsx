import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-[#007BFF] text-white hover:bg-[#0056b3] focus:ring-[#007BFF]',
    secondary: 'bg-[#E6F2FF] text-[#007BFF] hover:bg-[#cce5ff] focus:ring-[#007BFF]',
    ghost: 'bg-transparent text-[#000000] hover:bg-[#F8F8F8] focus:ring-[#007BFF]',
    danger: 'bg-[#DC3545] text-white hover:bg-[#c82333] focus:ring-[#DC3545]',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
