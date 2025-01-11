import { useStore } from '@/contexts/StoreContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '@/components/Products/ProductGrid';
import SearchResults from '@/components/Search/SearchResults';
import WelcomeSection from '@/components/Layout/WelcomeSection';
import { Category } from '@/types/categories';
import { generateCategoriesMap } from '@/utils/categories';

const Index = () => {
  const { state } = useStore();
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
        .select('*');

      if (error) throw error;
      return data;
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      const query = supabase
        .from('products')
        .select('*');

      if (category) {
        query.eq('category_id', category);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data.map(product => ({
        id: product.product_id,
        name: product.name,
        price: product.price?.amount ? Number(product.price.amount) : 0,
        brand: product.brand || '',
        volume: product.size?.text || '',
        pricePerUnit: product.price?.comparisonPrice || '',
        image: product.image?.url || '',
        quantity: 1
      }));
    },
  });

  const { categoriesMap } = generateCategoriesMap(categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    parentId: cat.parent_id,
  })));

  // Function to build category hierarchy
  const getCategoryHierarchy = (categoryId: string): Category[] => {
    const hierarchy: Category[] = [];
    let currentCategory = categoriesMap[categoryId];
    
    while (currentCategory) {
      hierarchy.unshift(currentCategory);
      if (currentCategory.parentId) {
        currentCategory = categoriesMap[currentCategory.parentId];
      } else {
        break;
      }
    }
    
    return hierarchy;
  };

  const currentCategory = category ? categoriesMap[category] : null;
  const categoryHierarchy = currentCategory ? getCategoryHierarchy(currentCategory.id) : [];

  // Show home page if no category or search query
  if (!category && !searchQuery) {
    return (
      <div>
        <WelcomeSection storeName={store?.name} />
      </div>
    );
  }

  // Show search results
  if (searchQuery) {
    return (
      <div className="px-[39px]">
        <SearchResults searchQuery={searchQuery} products={products} />
      </div>
    );
  }

  // Show category products
  return (
    <div className="mx-auto px-[39px]">
      <nav className="text-sm mb-8 text-gray-600">
        <Breadcrumb>
          <BreadcrumbList>
            {category === 'erbjudanden' ? (
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-gray-900 flex items-center gap-3">
                  <img src="/lovable-uploads/00ac429b-336d-455a-b07a-c5e9722254c3.png" alt="" className="w-4 h-4" />
                  {currentCategory?.name || 'Erbjudanden'}
                </BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Kategorier</BreadcrumbLink>
                </BreadcrumbItem>
                {categoryHierarchy.map((cat, index) => (
                  <React.Fragment key={cat.id}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {index === categoryHierarchy.length - 1 ? (
                        <BreadcrumbPage className="font-semibold text-gray-900">
                          {cat.name}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={`/?category=${cat.id}`}>
                          {cat.name}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <ProductGrid products={products} />
    </div>
  );
};

export default Index;