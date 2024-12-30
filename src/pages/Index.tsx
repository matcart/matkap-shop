import React from 'react';
import { useStore } from '@/contexts/StoreContext';
import { Search } from 'lucide-react';

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

  if (!selectedCategory) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <img 
          src="/placeholder.svg" 
          alt="Welcome" 
          className="mx-auto mb-6 max-w-md"
        />
        <h1 className="text-3xl font-bold text-gray-800">
          Välkommen till ICA Nära Sundbyberg
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
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