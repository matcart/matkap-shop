import { Category } from "@/types/categories";
import { ChevronRight } from "lucide-react";

interface CategoryListProps {
  rootCategories: Category[];
  selectedCategory: string | null;
  onCategoryClick: (categoryId: string) => void;
}

const CategoryList = ({ rootCategories, selectedCategory, onCategoryClick }: CategoryListProps) => (
  <nav className="h-full">
    <ul>
      {rootCategories.map((category: Category) => (
        <li key={category.id}>
          <button
            onClick={() => onCategoryClick(category.id)}
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

export default CategoryList;