import { ShoppingCart } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';

const HeaderCart = () => {
  const { state, dispatch } = useStore();
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      className="bg-ica-red text-white rounded-full px-4 py-2 hover:bg-red-700 transition-colors flex items-center gap-2 relative"
    >
      <ShoppingCart className="w-4 h-4" />
      <span className="text-sm font-medium">{total.toFixed(2)} kr</span>
      {cartItemCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-[#303030] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {cartItemCount}
        </div>
      )}
    </button>
  );
};

export default HeaderCart;