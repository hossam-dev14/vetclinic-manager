import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  options,
  className = '',
  id,
  ...props
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-[#000000]"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent transition-all bg-white ${
          error ? 'border-[#DC3545]' : 'border-[#ECECEC]'
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-sm text-[#DC3545]">{error}</span>
      )}
    </div>
  );
}
