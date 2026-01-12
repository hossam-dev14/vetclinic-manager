import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import { Fragment } from 'react';
import { cn } from '../../lib/utils';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  label?: string;
  className?: string;
}

export function RadioGroup({
  value,
  onChange,
  options,
  label,
  className,
}: RadioGroupProps) {
  return (
    <HeadlessRadioGroup value={value} onChange={onChange} className={className}>
      {label && (
        <HeadlessRadioGroup.Label className="text-sm font-medium text-[#000000] mb-2 block">
          {label}
        </HeadlessRadioGroup.Label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <HeadlessRadioGroup.Option
            key={option.value}
            value={option.value}
            as={Fragment}
          >
            {({ active, checked }) => (
              <div
                className={cn(
                  'relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none border transition-colors',
                  checked
                    ? 'bg-[#007BFF] bg-opacity-10 border-[#007BFF] text-[#007BFF]'
                    : 'bg-white border-[#ECECEC]',
                  active && 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-[#007BFF]'
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <HeadlessRadioGroup.Label
                        as="p"
                        className={cn(
                          'font-medium',
                          checked ? 'text-[#007BFF]' : 'text-gray-900'
                        )}
                      >
                        {option.label}
                      </HeadlessRadioGroup.Label>
                      {option.description && (
                        <HeadlessRadioGroup.Description
                          as="span"
                          className={cn(
                            'inline',
                            checked ? 'text-[#007BFF]' : 'text-gray-500'
                          )}
                        >
                          {option.description}
                        </HeadlessRadioGroup.Description>
                      )}
                    </div>
                  </div>
                  {checked && (
                    <div className="shrink-0 text-[#007BFF]">
                      <CheckIcon className="h-6 w-6" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </HeadlessRadioGroup.Option>
        ))}
      </div>
    </HeadlessRadioGroup>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#007BFF" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#007BFF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
