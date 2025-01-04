import { Plus, Minus } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    volume: string;
    brand: string;
    pricePerUnit: string;
    image: string;
  };
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { state, dispatch } = useStore();
  const cartItem = state.cart.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity: 0 }
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-[20px] p-4 shadow-sm h-[320px] flex flex-col">
        <div className="flex flex-col items-center">
          <div className="w-full h-[90px] flex items-start justify-center mb-6 relative">
            {!imageLoaded && (
              <Skeleton className="w-full h-[90px]" />
            )}
            <img
              src={product.image}
              alt={product.name}
              className={`h-full object-contain ${imageLoaded ? 'visible' : 'hidden'}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <h2 className="text-base font-semibold text-center leading-tight mb-2">
            {product.name}
          </h2>
          <div className="text-sm font-medium mb-2">
            {product.brand}
          </div>
          <div className="text-xs text-center mb-4 bg-gray-100 rounded-full px-2 py-1">
            {product.volume}
          </div>
        </div>

        <div className="flex flex-col mt-auto">
          <div className="text-base font-semibold mb-1">
            {product.price.toFixed(2)} kr
          </div>
          <div className="text-xs text-gray-500 mb-3">
            Jmf pris {product.pricePerUnit}
          </div>
          
          <div className="flex items-center justify-between">
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
                className="w-[36px] h-[36px] flex items-center justify-center bg-ica-red text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;