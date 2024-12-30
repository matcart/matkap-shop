import React from 'react';
import { useStore } from '@/contexts/StoreContext';

const products = [
  {
    id: '1',
    name: 'Mellanmjölk Färsk',
    price: 20.90,
    image: '/placeholder.svg',
    description: 'Färsk mellanmjölk från Arla',
  },
  {
    id: '2',
    name: 'Smör & Raps',
    price: 52.00,
    image: '/placeholder.svg',
    description: 'Normalsaltat 75%',
  },
  {
    id: '3',
    name: 'Färska Jordgubbar',
    price: 69.90,
    image: '/placeholder.svg',
    description: 'Svenska jordgubbar, 400g',
  },
];

const Index = () => {
  const { dispatch } = useStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Populära produkter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{product.price} kr</span>
              <button
                onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                className="bg-ica-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Lägg i varukorg
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;