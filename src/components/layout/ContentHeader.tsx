import type { ReactNode } from 'react';

interface ContentHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function ContentHeader({ title, description, action }: ContentHeaderProps) {
  return (
    <div className="flex flex-col gap-2 bg-[#F8F8F8] p-6 rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#666666]">{title}</h2>
          {description && (
            <p className="text-sm text-[#666666]">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
    </div>
  );
}

