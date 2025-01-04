import { Plus, Minus, X } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const Cart = () => {
  const { state, dispatch } = useStore();
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});

  const handleImageLoad = (id: string) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <Sheet open={state.isCartOpen} onOpenChange={() => dispatch({ type: 'TOGGLE_CART' })}>
      <SheetContent className="w-full sm:max-w-[500px] p-0">
        <SheetHeader className="p-6 flex items-center justify-between">
          <SheetTitle>Varukorg</SheetTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          >
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>

        <div className="px-6">
          {state.cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center py-4 border-b last:border-b-0"
            >
              <div className="relative w-[72px] h-[72px] mr-4">
                {!imageLoaded[item.id] && (
                  <Skeleton className="w-full h-full absolute" />
                )}
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full object-contain ${
                    !imageLoaded[item.id] ? 'invisible' : ''
                  }`}
                  onLoad={() => handleImageLoad(item.id)}
                />
              </div>

              <div className="flex-1">
                <div className="text-sm font-medium mb-1">{item.name}</div>
                <div className="text-sm text-gray-600 mb-2">
                  {item.brand}, {item.volume}
                </div>

                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1.5 w-fit">
                  <button
                    onClick={() => {
                      dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: {
                          id: item.id,
                          quantity: Math.max(0, item.quantity - 1)
                        }
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
                        type: 'UPDATE_QUANTITY',
                        payload: {
                          id: item.id,
                          quantity: item.quantity + 1
                        }
                      });
                    }}
                    className="text-gray-900 hover:text-gray-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-right ml-4">
                <div className="font-medium mb-1">
                  {(item.price * item.quantity).toFixed(2)} kr
                </div>
                <div className="text-sm text-gray-600">{item.price.toFixed(2)} kr/st</div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;