import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const categories = [
  { id: 'erbjudanden', name: 'Erbjudanden', icon: '🏷️' },
  { id: 'kott', name: 'Kött, Fågel & Fisk', icon: '🥩' },
  { id: 'frukt', name: 'Frukt & Grönt', icon: '🥬' },
  { id: 'mejeri', name: 'Mejeri & Ost', icon: '🥛' },
  { id: 'brod', name: 'Bröd & Kakor', icon: '🍞' },
  { id: 'vegetariskt', name: 'Vegetariskt', icon: '🥗' },
  { id: 'fardigmat', name: 'Färdigmat', icon: '🍱' },
  { id: 'barn', name: 'Barn', icon: '👶' },
  { id: 'traning', name: 'Träning', icon: '🏃' },
  { id: 'hushall', name: 'Hushåll', icon: '🏠' },
];

interface CategorySidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const CategorySidebar = ({ isOpen, onClose }: CategorySidebarProps) => {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Add your navigation logic here
  };

  const CategoryList = () => (
    <nav className="h-full">
      <ul className="space-y-1">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => handleCategoryClick(category.id)}
              className={`w-full text-left px-4 py-3 flex items-center justify-between group border-b border-gray-100
                ${selectedCategory === category.id ? 'bg-gray-50' : 'hover:bg-gray-50'}
                transition-colors duration-200`}
            >
              <span className="flex items-center gap-3">
                <span className="text-xl">{category.icon}</span>
                <span className="text-base font-medium">{category.name}</span>
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-full sm:w-[380px] p-0 bg-white">
          <SheetHeader className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold">Kategorier</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-5 w-5" />
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
    <aside className="hidden lg:block w-64 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold">Kategorier</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-5rem)]">
        <CategoryList />
      </div>
    </aside>
  );
};

export default CategorySidebar;