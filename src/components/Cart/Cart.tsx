import { X, Plus, Minus } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!state.isCartOpen) return null;

  const handleCheckout = () => {
    dispatch({ type: 'TOGGLE_CART' });
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => dispatch({ type: 'TOGGLE_CART' })} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl animate-slide-in">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-semibold">Varukorg</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8 hover:bg-gray-100 rounded-full"
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {state.cart.length === 0 ? (
              <p className="text-center text-gray-500 mt-8">Din varukorg är tom</p>
            ) : (
              <ul className="space-y-4">
                {state.cart.map((item) => (
                  <li key={item.id} className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                    {item.image && (
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-base">{item.name}</h3>
                      <div className="text-sm text-[#222222]">{item.brand}, {item.volume}</div>
                      <div className="text-base font-semibold text-[#222222] mt-1">{item.price} kr</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={() => dispatch({
                          type: 'UPDATE_QUANTITY',
                          payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) }
                        })}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={() => dispatch({
                          type: 'UPDATE_QUANTITY',
                          payload: { id: item.id, quantity: item.quantity + 1 }
                        })}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Totalt:</span>
              <span className="font-semibold">{total.toFixed(2)} kr</span>
            </div>
            <button
              className="w-full bg-ica-red text-white text-sm font-semibold py-3 rounded-full hover:bg-red-700 transition-colors"
              onClick={handleCheckout}
            >
              Gå till kassan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;