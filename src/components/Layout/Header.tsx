import React from 'react';
import { Menu, Search } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';

const Header = () => {
  const { state, dispatch } = useStore();
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-5 lg:px-[100px]">
        <div className="flex flex-col py-4">
          <div className="flex items-center justify-between gap-4">
            <button 
              className="lg:hidden p-2"
              onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4">
              <img src="/ica-logo.svg" alt="ICA" className="h-8" />
            </div>

            <button 
              className="p-2 relative"
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            >
              <img src="/cart.png" alt="Cart" className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-ica-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          <div className="mt-4 lg:mt-0 lg:absolute lg:left-[100px] lg:top-1/2 lg:-translate-y-1/2">
            <div className="relative max-w-[376px]">
              <input
                type="search"
                placeholder="Sök bland tusentals varor"
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#F5F5F5] focus:outline-none placeholder-[#898E8F]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#898E8F]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;