import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProductGrid from '@/components/Products/ProductGrid';
import SearchResults from '@/components/Search/SearchResults';
import WelcomeSection from '@/components/Layout/WelcomeSection';
import { Category } from '@/types/categories';
import { Product } from '@/types/product';
import { generateCategoriesMap } from '@/utils/categories';
import Breadcrumbs from '@/components/BreadCrumbs';

const Index = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const getSubdomain = () => {
    const hostname = window.location.hostname;
    if (hostname.includes('matkap.se')) {
      const subdomain = hostname.split('.')[0];
      return subdomain;
    }
    return 'icademo';
  };

  const { data: store } = useQuery({
    queryKey: ['store', getSubdomain()],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('sub_domain', getSubdomain())
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;

      return data.map((category) => ({
        id: category.id,
        name: category.name,
        parentId: category.parent_id,
        icon: category.id === 'erbjudanden' ? '/lovable-uploads/00ac429b-336d-455a-b07a-c5e9722254c3.png' : undefined
      }));
    }
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products', category],
    enabled: !!category,
    queryFn: async () => {
      const query = supabase.from('products').select('*');

      if (category) {
        query.eq('category_id', category);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data.map((product: any): Product => ({
        id: product.product_id,
        name: product.name,
        price: product.price?.amount ? Number(product.price.amount) : 0,
        brand: product.brand || '',
        volume: product.size?.text || '',
        pricePerUnit: product.price?.comparisonPrice || '',
        image: product.image?.url || '',
        quantity: 1,
        description: product.description,
      }));
    },
  });

  const { categoriesMap } = generateCategoriesMap(categories);

  const getCategoryHierarchy = (categoryId: string): Category[] => {
    const hierarchy: Category[] = [];
    let currentCategory = categoriesMap[categoryId];

    while (currentCategory) {
      // Add the category to the beginning of the hierarchy
      hierarchy.unshift(currentCategory);
      // Move to the parent category
      currentCategory = categoriesMap[currentCategory.parentId];
    }

    return hierarchy;
  };

  const currentCategory = category ? categoriesMap[category] : null;
  const categoryHierarchy = currentCategory ? getCategoryHierarchy(currentCategory.id) : [];

  if (!category && !searchQuery) {
    return (
      <div>
        <WelcomeSection storeName={store?.name} />
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
        category={category}
        categoryHierarchy={categoryHierarchy}
        currentCategory={currentCategory}
      />
      <ProductGrid products={products} />
    </div>
  );
};

export default Index;