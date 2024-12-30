import React from 'react';
import { useStore } from '@/contexts/StoreContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Minus } from 'lucide-react';

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

const Index = () => {
  const { state, dispatch } = useStore();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    'dairy'
  );

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

  if (!selectedCategory) {
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

  return (
    <div className="mx-auto px-[39px]">
      <nav className="text-sm mb-8 text-gray-600">
        <ol className="flex items-center gap-2">
          <li>Kategorier</li>
          <li>/</li>
          <li>Mejeri & Ost</li>
          <li>/</li>
          <li className="font-semibold text-gray-900">Allt inom Mejeri & Ost</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pr-0">
        {products.map((product) => {
          const cartItem = state.cart.find(item => item.id === product.id);
          const quantity = cartItem?.quantity || 0;

          return (
            <div key={product.id} className="bg-white rounded-[20px] p-4 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="w-full h-[90px] flex items-start justify-center mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                </div>
                <h2 className="text-base text-center font-semibold leading-tight mb-4">
                  {product.name}
                </h2>
                <div className="text-xs text-center mb-1 bg-gray-100 rounded-full px-2 py-1">
                  {product.volume}
                </div>
                <div className="text-sm font-medium mb-0.5">
                  {product.brand}
                </div>
                <div className="text-xs text-gray-600 mb-4">
                  {product.pricePerUnit}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-base font-semibold">
                  {product.price.toFixed(2)} kr
                </div>
                
                {quantity > 0 ? (
                  <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1.5 h-[36px]">
                    <button
                      onClick={() => dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { id: product.id, quantity: Math.max(0, quantity - 1) }
                      })}
                      className="text-gray-900 hover:text-gray-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-gray-900 min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => dispatch({
                        type: 'ADD_TO_CART',
                        payload: product
                      })}
                      className="text-gray-900 hover:text-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => dispatch({
                      type: 'ADD_TO_CART',
                      payload: product
                    })}
                    className="w-[36px] h-[36px] flex items-center justify-center bg-ica-red text-white rounded-full hover:bg-red-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
