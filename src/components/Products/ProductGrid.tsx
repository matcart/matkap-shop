import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { Skeleton } from '@/components/ui/skeleton';
import { PackageSearch } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-[20px] p-4 shadow-sm h-[320px] flex flex-col">
            <div className="flex flex-col items-center">
              <Skeleton className="w-full h-[90px] mb-6" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/4 mb-1" />
              <Skeleton className="h-4 w-1/2 mb-0.5" />
              <Skeleton className="h-4 w-1/3 mb-2" />
            </div>
            <div className="flex items-center justify-between mt-auto">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-[36px] w-[36px] rounded-full" />
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
          Vi kunde inte hitta några produkter som matchar din sökning. Försök med andra söktermer eller bläddra i våra kategorier.
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