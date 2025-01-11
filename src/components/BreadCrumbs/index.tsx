import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Category } from '@/types/categories';
import { useStore } from '@/contexts/StoreContext';

interface BreadcrumbsProps {
  category: string | null;
  categoryHierarchy: Category[];
  currentCategory: Category | null;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ categoryHierarchy }) => {
  const { dispatch } = useStore();

  const handleCategoryClick = (category: Category) => {
    dispatch({ type: 'SET_CURRENT_CATEGORY', payload: category });
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
  };

  return (
    <nav className="text-sm mb-8 text-gray-600">
      <Breadcrumb>
        <BreadcrumbList>
          {/* Root category */}
          <BreadcrumbItem>
            <BreadcrumbLink 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: 'SET_CURRENT_CATEGORY', payload: null });
                dispatch({ type: 'SET_SELECTED_CATEGORY', payload: null });
              }}
            >
              Kategorier
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Render the full category hierarchy */}
          {categoryHierarchy.map((cat, index) => (
            <React.Fragment key={cat.id}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === categoryHierarchy.length - 1 ? (
                  <BreadcrumbPage className="font-semibold text-gray-900">
                    {cat.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink 
                    href={`/?category=${cat.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(cat);
                    }}
                  >
                    {cat.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default Breadcrumbs;