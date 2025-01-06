import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useStore } from '@/contexts/StoreContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { generateCategoriesMap } from '@/utils/categories';
import type { Category } from '@/types/categories';

const CategorySidebar = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const { state, dispatch } = useStore();

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;

      // Transform the data to match our Category type
      return data.map((category) => ({
        id: category.id,
        name: category.name,
        parentId: category.parent_id,
        icon: category.id === 'erbjudanden' ? '/lovable-uploads/00ac429b-336d-455a-b07a-c5e9722254c3.png' : undefined
      }));
    }
  });

  const { rootCategories } = generateCategoriesMap(categories);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/?category=${categoryId}`);
    if (isMobile) {
      dispatch({ type: 'TOGGLE_SIDEBAR' });
    }
  };

  const CategoryList = () => (
    <nav className="h-full">
      <ul>
        {rootCategories.map((category: Category) => (
          <li key={category.id}>
            <button
              onClick={() => handleCategoryClick(category.id)}
              className={`w-full text-left px-4 py-[18px] flex items-center justify-between group leading-none
                ${selectedCategory === category.id ? 'bg-gray-50' : 'hover:bg-gray-50'}
                ${category.id === 'erbjudanden' ? '' : 'border-t border-gray-200'}`}
            >
              <div className="flex items-center gap-3">
                {category.icon && (
                  <img src={category.icon} alt="" className="w-4 h-4 text-gray-600" />
                )}
                <span className="text-sm font-medium text-gray-900">{category.name}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 -mr-1" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (isMobile) {
    return (
      <Sheet open={state.isSidebarOpen} onOpenChange={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}>
        <SheetContent side="left" className="w-full p-0 bg-white">
          <SheetHeader className="p-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-bold">Kategorier</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
                className="p2 h-8 w-8"
              >
                <img src="assets/icons/exit_icon.svg" className="h-8 w-8" />
              </Button>
            </div>
          </SheetHeader>
          <div className="overflow-y-auto h-[calc(100vh-5rem)]">
            <CategoryList />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden lg:block">
      <aside className="w-64 bg-white rounded-xl shadow-sm">
        <div className="px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-900">Kategorier</h2>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
          <CategoryList />
        </div>
      </aside>
    </div>
  );
};

export default CategorySidebar;