import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { Category } from '@/types/categories';
import { motion } from 'framer-motion';
import EmptyState from '../EmptyState';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  selectedCategory?: Category | null;
}

const ProductGrid = ({ products, isLoading, selectedCategory }: ProductGridProps) => {
  if (!products.length && !isLoading) {
    return (
      <EmptyState categoryName={selectedCategory.name} />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: index * 0.03,
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