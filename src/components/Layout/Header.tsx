import { Search, X } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '../ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogoClick = () => {
    if (searchParams.get('category') || searchParams.get('search')) {
      navigate('/');
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky lg:px-[100px] px-[20px] top-0 z-50 bg-white">
      <div>
        <div className="flex flex-col py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              className="lg:hidden p-2 w-8 h-8"
              onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            >
              <img src="/assets/icons/burger.svg" alt="Menu" />
            </Button>

            <div 
              className="flex items-center gap-4 lg:pl-[5px] cursor-pointer" 
              onClick={handleLogoClick}
            >
              <img src="/assets/icons/ica_logo.svg" alt="ICA Logo" className="h-[26px]" />
              <span className="text-sm font-semibold">{"ICA Nära Laduvägen"}</span>
            </div>

            <Button
              variant="ghost"
              className="p-2 relative"
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            >
              <img src="/assets/icons/cart.svg" alt="Cart" className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-ica-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>

          <div className="mt-4 lg:mt-0 lg:absolute lg:left-[394px] lg:top-1/2 lg:-translate-y-1/2 lg:w-[376px]">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder="Sök bland tusentals varor"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-10 rounded-lg bg-[#F5F5F5] focus:outline-none focus:border focus:border-[#222222] placeholder-[#898E8F] [&::-webkit-search-cancel-button]:hidden"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#898E8F] pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-[#898E8F]" />
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;