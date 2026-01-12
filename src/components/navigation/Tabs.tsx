import { Tab } from '@headlessui/react';
import { cn } from '../../lib/utils';

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  className?: string;
}

export function Tabs({ items, className }: TabsProps) {
  return (
    <div className={cn('w-full', className)}>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-[#F8F8F8] p-1">
          {items.map((item) => (
            <Tab
              key={item.label}
              className={({ selected }) =>
                cn(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-[#007BFF] focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-[#007BFF] shadow'
                    : 'text-[#666666] hover:bg-white/[0.12] hover:text-[#000000]'
                )
              }
            >
              {item.label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {items.map((item, idx) => (
            <Tab.Panel
              key={idx}
              className={cn(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-[#007BFF] focus:outline-none focus:ring-2'
              )}
            >
              {item.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
