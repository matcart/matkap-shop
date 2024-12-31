import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';

const Header = () => {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

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
            <Link to="/" className="flex items-center gap-2">
              <img src="/assets/icons/ica_logo.svg" alt="ICA" className="h-[22px]" />
              <span className="text-[#C70A1D] font-medium">MAXI ICA Stormarknad</span>
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch}>
              <Input
                type="search"
                placeholder="Sök bland alla varor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50"
              />
            </form>
          </div>

          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            >
              <img src="/assets/icons/cart.svg" alt="Cart" className="w-5 h-5" />
              {cartItemCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-ica-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;