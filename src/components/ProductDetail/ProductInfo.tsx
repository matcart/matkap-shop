import { Plus, Minus } from "lucide-react";
import { useStore } from '@/contexts/StoreContext';
import { Product } from '@/types/product';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { state, dispatch } = useStore();
  const cartItem = state.cart.find(item => item?.id === product?.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity: 0 }
    });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold mb-8">{product.name}</h1>
      <div className="text-sm bg-gray-100 rounded-full px-3 py-1 w-fit mb-4">
        {product.volume}
      </div>
      <div className="text-base mb-1">{product.brand}</div>
      <div className="text-sm text-gray-600 mb-16">{product.pricePerUnit}</div>
      
      <div className="text-2xl font-semibold mb-6">
        {product.price.toFixed(2)} kr
      </div>

      {quantity > 0 ? (
        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1.5 h-[36px] w-fit">
          <button
            onClick={() => {
              dispatch({
                type: 'UPDATE_QUANTITY',
                payload: { id: product.id, quantity: Math.max(0, quantity - 1) }
              });
            }}
            className="text-gray-900 hover:text-gray-700"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-gray-900 min-w-[20px] text-center">
            {quantity}
          </span>
          <button
            onClick={handleAddToCart}
            className="text-gray-900 hover:text-gray-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-ica-red text-white rounded-full px-8 py-2 hover:bg-red-700 transition-colors w-fit"
        >
          Lägg till i varukorg
        </button>
      )}
    </div>
  );
};

export default ProductInfo;