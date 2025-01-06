import { useStore } from '@/contexts/StoreContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '@/components/Products/ProductGrid';
import SearchResults from '@/components/Search/SearchResults';
import WelcomeSection from '@/components/Layout/WelcomeSection';

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
        price: product.price.amount,
        brand: product.brand || '',
        volume: product.size?.text || '',
        pricePerUnit: product.price.comparisonPrice || '',
        image: product.image.url,
      }));
    },
  });

  const currentCategory = categories.find(c => c.id === category);

  // Filter products based on search query if present
  const filteredProducts = searchQuery 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

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
        <SearchResults searchQuery={searchQuery} products={filteredProducts} />
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
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-gray-900">
                    {currentCategory?.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default Index;