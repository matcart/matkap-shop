import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

const Header = () => {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#f5f5f5]">
      <div className="lg:px-[100px] px-[20px]">
        <div className="flex justify-between items-center h-[70px]">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <img src="/assets/icons/ica_logo.svg" alt="ICA" className="h-[22px]" />
              <span className="text-[#222222] font-medium ml-4">ICA Nära Sundbyberg</span>
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Sök bland alla varor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-8 bg-[#F5F5F5] border-none hover:bg-[#ECEDEE] focus:bg-[#ECEDEE] transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="bg-ica-red text-white rounded-full px-4 py-2 hover:bg-red-700 transition-colors flex items-center gap-2 relative"
            >
              <img src="/assets/icons/cart.svg" alt="Cart" className="w-4 h-4 brightness-0 invert" />
              <span className="text-sm font-medium">{total.toFixed(2)} kr</span>
              {cartItemCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-[#303030] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;