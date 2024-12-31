import { Link } from 'react-router-dom';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '../ui/button';

const Header = () => {
  const { state, dispatch } = useStore();
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#f5f5f5]">
      <div className="lg:px-[100px] px-[20px]">
        <div className="flex justify-between items-center h-[70px]">
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/icons/ica_logo.svg" alt="ICA" className="h-[22px]" />
          </Link>

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