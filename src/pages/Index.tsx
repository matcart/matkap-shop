import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductGrid from '@/components/Products/ProductGrid';
import SearchResults from '@/components/Search/SearchResults';
import WelcomeSection from '@/components/Layout/WelcomeSection';
import { Category } from '@/types/categories';
import { generateCategoriesMap } from '@/utils/categories';
import Breadcrumbs from '@/components/BreadCrumbs';
import { getProducts } from '@/api/products';
import { getCategories } from '@/api/categories';

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
  const category = searchParams.get('category');
  const view = searchParams.get('view');
  const searchQuery = searchParams.get('search');

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products', category],
    queryFn: () => getProducts(category || undefined),
    enabled: !!category && !!view
  });

  const { categoriesMap } = generateCategoriesMap(categories);
  const currentCategory = category ? categoriesMap[category] : null;
  const categoryHierarchy = currentCategory 
    ? getCategoryHierarchy(currentCategory.id, categoriesMap) 
    : [];

  if (!category && !searchQuery) {
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

  if (!view) {
    return <div />; // Empty state when just browsing categories
  }

  return (
    <div className="mx-auto px-[39px]">
      <Breadcrumbs
        category={category}
        categoryHierarchy={categoryHierarchy}
        currentCategory={currentCategory}
      />
      <ProductGrid products={products} />
    </div>
  );
};

export default Index;