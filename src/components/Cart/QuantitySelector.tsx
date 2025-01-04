import { Plus, Minus } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { Product } from "@/types/product";

interface QuantitySelectorProps {
  item: Product;
}

const QuantitySelector = ({ item }: QuantitySelectorProps) => {
  const { dispatch } = useStore();

  return (
    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1.5 h-[36px]">
      <button
        onClick={() => {
          dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) }
          });
        }}
        className="text-gray-900 hover:text-gray-700"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="text-gray-900 min-w-[20px] text-center">
        {item.quantity}
      </span>
      <button
        onClick={() => {
          dispatch({
            type: 'ADD_TO_CART',
            payload: { ...item, quantity: item.quantity }
          });
        }}
        className="text-gray-900 hover:text-gray-700"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;