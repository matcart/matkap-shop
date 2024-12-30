import React from 'react';
import { Menu, ShoppingCart } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';

const Header = () => {
  const { state, dispatch } = useStore();
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button className="lg:hidden p-2">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center">
          <img src="/ica-logo.svg" alt="ICA" className="h-8" />
          <span className="ml-2 text-lg font-semibold">Nära Laduvägen</span>
        </div>

        <button 
          className="p-2 relative"
          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
        >
          <ShoppingCart className="w-6 h-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-ica-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;