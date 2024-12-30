import React from 'react';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';

const Header = () => {
  const { state, dispatch } = useStore();
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
          <img src="/ica-logo.svg" alt="ICA" className="h-8" />
        </div>

        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="search"
              placeholder="Sök bland tusentals varor"
              className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:border-ica-red"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        <button 
          className="p-2 relative"
          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
        >
          <ShoppingBag className="w-6 h-6" />
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