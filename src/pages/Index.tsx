import React, { useState } from 'react';
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
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '@/constants';

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
  const navigate = useNavigate();
  const searchQuery = searchParams.get('search');
  const { state, dispatch } = useStore();
  const { selectedCategory } = state;
  const [mockedProducts, setMockedProducts] = useState([])

  // Clear search when category is selected
  React.useEffect(() => {
    if (selectedCategory) {
      navigate('/', { replace: true });
    }

    if (selectedCategory && selectedCategory.name === 'Frukt & Grönt') {
      console.log("HERE")
      setMockedProducts(MOCK_PRODUCTS)
    } else {
      setMockedProducts([])
    }
  }, [selectedCategory, navigate]);

  // Clear category when searching
  React.useEffect(() => {
    if (searchQuery) {
      dispatch({ type: 'SET_SELECTED_CATEGORY', payload: null })
    }
  }, [searchQuery, navigate]);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const { data: categoryProducts = [], isLoading: isLoadingCategoryProducts } = useQuery({
    queryKey: ['products', selectedCategory?.id],
    queryFn: () => getProducts(selectedCategory?.id),
    enabled: !searchQuery && !!selectedCategory
  });

  const { data: searchResults = [], isLoading: isLoadingSearch } = useQuery({
    queryKey: ['products', 'search', searchQuery],
    queryFn: () => getProducts(undefined, searchQuery),
    enabled: !!searchQuery
  });

  const { categoriesMap } = generateCategoriesMap(categories);
  const categoryHierarchy = selectedCategory
    ? getCategoryHierarchy(selectedCategory.id, categoriesMap)
    : [];

  if (!selectedCategory && !searchQuery) {
    return (
      <div>
        <WelcomeSection />
      </div>
    );
  }

  // If we're searching, show search results regardless of selected category
  if (searchQuery) {
    return (
      <div className="px-[39px]">
        <SearchResults
          searchQuery={searchQuery}
          products={searchResults}
          isLoading={isLoadingSearch}
        />
      </div>
    );
  }

  // Only show category results if we're not searching
  return (
    <div className="mx-auto px-[39px]">
      <Breadcrumbs
        category={selectedCategory?.id || null}
        categoryHierarchy={categoryHierarchy}
        currentCategory={selectedCategory}
      />
      <ProductGrid
        products={mockedProducts}
        isLoading={isLoadingCategoryProducts}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Index;