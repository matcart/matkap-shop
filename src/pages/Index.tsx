import React from 'react';
import { useStore } from '@/contexts/StoreContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const products = [
  {
    id: '1',
    name: 'Mellanmjölk Färsk',
    price: 20.90,
    image: '/placeholder.svg',
    description: 'Färsk mellanmjölk från Arla',
    quantity: 0, // Added quantity field
  },
  {
    id: '2',
    name: 'Smör & Raps',
    price: 52.00,
    image: '/placeholder.svg',
    description: 'Normalsaltat 75%',
    quantity: 0,
  },
  {
    id: '3',
    name: 'Färska Jordgubbar',
    price: 69.90,
    image: '/placeholder.svg',
    description: 'Svenska jordgubbar, 400g',
    quantity: 0,
  },
];

const Index = () => {
  const { dispatch } = useStore();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const { data: store } = useQuery({
    queryKey: ['store'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stores')
        .select('name')
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (!selectedCategory) {
    return (
      <div>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm ml-0 lg:ml-[39px]">
          <div className="flex flex-col md:flex-row h-[400px]">
            {/* Left side - Image */}
            <div className="w-full md:w-1/2 h-48 md:h-full relative">
              <img
                src="/src/assets/images/welcome.png"
                alt="Welcome"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side - Text */}
            <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center items-center text-center">
              <h2 className="text-ica-red text-base font-semibold mb-2">
                Välkommen till
              </h2>
              <h1 className="text-[25px] font-semibold text-gray-900">
                {store?.name || 'ICA Nära Laduvägen'}
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 lg:px-[100px] py-8">
      <h1 className="text-2xl font-bold mb-6">Populära produkter</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-xl mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{product.price} kr</span>
              <button
                onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                className="bg-ica-red text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <span className="sr-only">Lägg i varukorg</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;