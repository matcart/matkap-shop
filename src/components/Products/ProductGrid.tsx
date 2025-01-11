import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { Skeleton } from '@/components/ui/skeleton';
import { PackageSearch } from 'lucide-react';
import { Category } from '@/types/categories';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  searchQuery?: string | null;
  selectedCategory?: Category | null;
}

const ProductGrid = ({ products, isLoading, searchQuery, selectedCategory }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-[20px] p-4 shadow-sm h-[320px] flex flex-col">
            <div className="flex flex-col items-center">
              <Skeleton className="w-[120px] h-[90px] mb-6 bg-gray-100" />
              <Skeleton className="w-[180px] h-5 mb-4 bg-gray-100" />
              <Skeleton className="w-[80px] h-4 mb-1 bg-gray-100" />
              <Skeleton className="w-[100px] h-4 mb-0.5 bg-gray-100" />
              <Skeleton className="w-[60px] h-4 mb-2 bg-gray-100" />
            </div>
            <div className="flex items-center justify-between mt-auto">
              <Skeleton className="w-[60px] h-6 bg-gray-100" />
              <Skeleton className="w-[36px] h-[36px] rounded-full bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <PackageSearch className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Inga produkter hittades</h3>
        <p className="text-gray-500 text-center max-w-md">
          {searchQuery 
            ? `Vi kunde inte hitta några produkter för "${searchQuery}"`
            : selectedCategory
              ? `Vi kunde inte hitta några produkter inom ${selectedCategory.name}`
              : "Vi kunde inte hitta några produkter. Försök med andra söktermer eller bläddra i våra kategorier."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;