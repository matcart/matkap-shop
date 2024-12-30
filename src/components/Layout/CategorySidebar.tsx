import React from 'react';
import { ChevronRight } from 'lucide-react';

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

const CategorySidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto">
      <nav className="h-full p-4">
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center justify-between group">
                <span className="flex items-center">
                  <span className="mr-3">{category.icon}</span>
                  <span>{category.name}</span>
                </span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default CategorySidebar;