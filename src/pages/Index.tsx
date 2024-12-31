import { useStore } from '@/contexts/StoreContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/Products/ProductCard';
import SearchResults from '@/components/Search/SearchResults';

const products = [
  {
    id: '1',
    name: 'Mellanmjölk Färsk',
    price: 19.90,
    volume: '1,5 liter',
    brand: 'Arla',
    pricePerUnit: '13,93kr/l',
    image: '/lovable-uploads/342bd940-31eb-4e14-bcc1-177dad0228da.png',
    quantity: 0,
  },
  {
    id: '2',
    name: 'Mellanmjölk Längre Hållbarhet',
    price: 19.90,
    volume: '1,5 liter',
    brand: 'ICA',
    pricePerUnit: '14,60kr/l',
    image: '/lovable-uploads/342bd940-31eb-4e14-bcc1-177dad0228da.png',
    quantity: 0,
  },
  {
    id: '3',
    name: 'Mellanmjölk Färsk Ekologisk',
    price: 24.90,
    volume: '1,5 liter',
    brand: 'Arla',
    pricePerUnit: '16,60kr/l',
    image: '/lovable-uploads/342bd940-31eb-4e14-bcc1-177dad0228da.png',
    quantity: 0,
  },
  {
    id: '4',
    name: 'Standardmjölk Färsk',
    price: 23.90,
    volume: '1,5 liter',
    brand: 'Arla',
    pricePerUnit: '15,93kr/l',
    image: '/lovable-uploads/342bd940-31eb-4e14-bcc1-177dad0228da.png',
    quantity: 0,
  },
];

const categories = [
  { 
    id: 'erbjudanden', 
    name: 'Erbjudanden', 
    icon: '/lovable-uploads/00ac429b-336d-455a-b07a-c5e9722254c3.png' 
  },
  { id: 'kott', name: 'Kött, Fågel & Fisk' },
  { id: 'frukt', name: 'Frukt & Grönt' },
  { id: 'mejeri', name: 'Mejeri & Ost' },
  { id: 'brod', name: 'Bröd & Kakor' },
  { id: 'vegetariskt', name: 'Vegetariskt' },
  { id: 'fardigmat', name: 'Färdigmat' },
  { id: 'barn', name: 'Barn' },
  { id: 'traning', name: 'Träning' },
  { id: 'hushall', name: 'Hushåll' },
];

const Index = () => {
  const { state } = useStore();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const { data: stores } = useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stores')
        .select('name');

      if (error) throw error;
      return data;
    },
  });

  const storeName = stores?.[0]?.name || 'ICA Nära Laduvägen';
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
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm ml-0 lg:ml-[39px]">
          <div className="flex flex-col md:flex-row h-[400px]">
            <div className="w-full md:w-1/2 h-48 md:h-full relative">
              <img
                src="/assets/images/welcome.png"
                alt="Welcome"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center items-center text-center">
              <h2 className="text-ica-red text-base font-semibold mb-2">
                Välkommen till
              </h2>
              <h1 className="text-[25px] font-semibold text-gray-900">
                {storeName}
              </h1>
            </div>
          </div>
        </div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Index;