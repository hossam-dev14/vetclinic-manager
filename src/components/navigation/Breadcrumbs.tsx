import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const location = useLocation();

  // Generate breadcrumbs from path if items not provided
  const generatedItems = items || location.pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, array) => {
      const href = `/${array.slice(0, index + 1).join('/')}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      return { label, href };
    });

  return (
    <nav aria-label="Breadcrumb" className={cn('flex', className)}>
      <ol className="flex items-center space-x-2">
        <li>
          <div>
            <Link to="/" className="text-[#666666] hover:text-[#000000]">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {generatedItems.map((item, index) => (
          <li key={item.label}>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-[#666666]" aria-hidden="true" />
              {item.href && index < generatedItems.length - 1 ? (
                <Link
                  to={item.href}
                  className="ml-2 text-sm font-medium text-[#666666] hover:text-[#000000]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="ml-2 text-sm font-medium text-[#000000]">
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
