import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { PackageSearch } from 'lucide-react';
import { Category } from '@/types/categories';
import { motion } from 'framer-motion';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  searchQuery?: string | null;
  selectedCategory?: Category | null;
}

const ProductGrid = ({ products, isLoading, searchQuery, selectedCategory }: ProductGridProps) => {
  if (!products.length && !isLoading) {
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
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: index * 0.05,
            ease: "easeOut"
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;