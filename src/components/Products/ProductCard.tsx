import { Plus, Minus } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { Link } from "react-router-dom";
import { Product } from '@/types/product';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { state, dispatch } = useStore();
  const cartItem = state.cart.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the add button
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity: 0 }
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-[20px] p-4 shadow-sm h-[320px] flex flex-col">
        <div className="flex flex-col items-center">
          <div className="w-full h-[90px] flex items-start justify-center mb-6">
            <img
              src={product.image}
              alt={product.name}
              className="h-full object-contain"
            />
          </div>
          <h2 className="text-base font-semibold text-center leading-tight mb-4">
            {product.name}
          </h2>
          <div className="text-xs text-center mb-1 bg-gray-100 rounded-full px-2 py-1">
            {product.volume}
          </div>
          <div className="text-sm font-medium mb-0.5">
            {product.brand}
          </div>
          <div className="text-xs text-gray-600 mb-2">
            {product.pricePerUnit}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="text-base font-semibold">
            {product.price.toFixed(2)} kr
          </div>
          
          {quantity > 0 ? (
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1.5 h-[36px]">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: product.id, quantity: Math.max(0, quantity - 1) }
                  });
                }}
                className="text-gray-900 hover:bg-gray-200 rounded-full p-1 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-gray-900 min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={handleAddToCart}
                className="text-gray-900 hover:bg-gray-200 rounded-full p-1 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-[36px] h-[36px] flex items-center justify-center bg-ica-red text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;