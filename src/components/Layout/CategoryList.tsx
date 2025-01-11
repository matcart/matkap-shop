import { Category } from "@/types/categories";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from '@/contexts/StoreContext';

interface CategoryListProps {
  rootCategories: Category[];
  onBackClick: () => void;
}

const CategoryList = ({
  rootCategories,
  onBackClick
}: CategoryListProps) => {
  const { state, dispatch } = useStore();
  const { currentCategory, selectedCategory } = state;
  
  const categories = currentCategory ? currentCategory.children : rootCategories;

  const handleViewAll = () => {
    if (currentCategory) {
      dispatch({ type: 'SET_SELECTED_CATEGORY', payload: currentCategory });
      dispatch({ type: 'TOGGLE_SIDEBAR' });
    }
  };

  const handleCategoryClick = (category: Category) => {
    if (!category.children || category.children.length === 0) {
      // If it's a leaf category, set it as selected category and close sidebar
      dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
      dispatch({ type: 'TOGGLE_SIDEBAR' });
    } else {
      // For non-leaf categories, update the current category for navigation
      dispatch({ type: 'SET_CURRENT_CATEGORY', payload: category });
    }
  };

  return (
    <nav className="h-full">
      {currentCategory && (
        <>
          <button
            onClick={onBackClick}
            className="w-full text-left px-4 py-[18px] flex items-center gap-3 hover:bg-gray-50 border-b border-gray-200"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">{currentCategory.name}</span>
          </button>
          <button
            onClick={handleViewAll}
            className="w-full text-left px-4 py-[18px] flex items-center gap-3 text-red-600 hover:bg-gray-50 border-b border-gray-200"
          >
            <span className="text-sm font-medium">Allt inom {currentCategory.name}</span>
          </button>
        </>
      )}
      <ul>
        {categories.map((category: Category) => (
          <li key={category.id}>
            <button
              onClick={() => handleCategoryClick(category)}
              className={`w-full text-left px-4 py-[18px] flex items-center justify-between group leading-none
                ${selectedCategory?.id === category.id ? 'bg-gray-50' : 'hover:bg-gray-50'}
                ${category.id === 'erbjudanden' ? '' : 'border-t border-gray-200'}`}
            >
              <div className="flex items-center gap-3">
                {category.icon && (
                  <img src={category.icon} alt="" className="w-4 h-4 text-gray-600" />
                )}
                <span className="text-sm font-medium text-gray-900">{category.name}</span>
              </div>
              {category.children && category.children.length > 0 && (
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 -mr-1" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryList;