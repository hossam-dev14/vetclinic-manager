import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[#000000]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent transition-all ${
          error ? 'border-[#DC3545]' : 'border-[#ECECEC]'
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-sm text-[#DC3545]">{error}</span>
      )}
    </div>
  );
}
