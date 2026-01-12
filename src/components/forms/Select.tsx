import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, children, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className="flex flex-col gap-1 w-full">
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
          ref={ref}
          className={cn(
            "flex h-9 w-full rounded-md border border-[#ECECEC] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-[#666666] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#007BFF] disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-[#DC3545]" : "",
            className
          )}
          {...props}
        >
          {options
            ? options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            : children}
        </select>
        {error && <span className="text-sm text-[#DC3545]">{error}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';

