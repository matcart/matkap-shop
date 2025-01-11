import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '@/components/Products/ProductGrid';
import SearchResults from '@/components/Search/SearchResults';
import WelcomeSection from '@/components/Layout/WelcomeSection';
import { Category } from '@/types/categories';
import { generateCategoriesMap } from '@/utils/categories';
import Breadcrumbs from '@/components/BreadCrumbs';
import { getProducts } from '@/api/products';
import { getCategories } from '@/api/categories';
import { useStore } from '@/contexts/StoreContext';
import { useSearchParams } from 'react-router-dom';

const getCategoryHierarchy = (categoryId: string, categoriesMap: Record<string, Category>): Category[] => {
  const hierarchy: Category[] = [];
  let currentCategory = categoriesMap[categoryId];

  while (currentCategory) {
    hierarchy.unshift(currentCategory);
    currentCategory = currentCategory.parentId ? categoriesMap[currentCategory.parentId] : null;
  }

  return hierarchy;
};

const Index = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const { state } = useStore();
  const { selectedCategory } = state;

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', selectedCategory?.id],
    queryFn: () => getProducts(selectedCategory?.id),
    enabled: !!selectedCategory
  });

  const { categoriesMap } = generateCategoriesMap(categories);
  const categoryHierarchy = selectedCategory 
    ? getCategoryHierarchy(selectedCategory.id, categoriesMap) 
    : [];

  if (!selectedCategory && !searchQuery) {
    return (
      <div>
        <WelcomeSection storeName="ICA" />
      </div>
    );
  }

  if (searchQuery) {
    return (
      <div className="px-[39px]">
        <SearchResults searchQuery={searchQuery} products={products} />
      </div>
    );
  }

  return (
    <div className="mx-auto px-[39px]">
      <Breadcrumbs
        category={selectedCategory?.id || null}
        categoryHierarchy={categoryHierarchy}
        currentCategory={selectedCategory}
      />
      <ProductGrid products={products} isLoading={isLoadingProducts} />
    </div>
  );
};

export default Index;