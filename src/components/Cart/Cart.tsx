import { ShoppingCart, X } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import QuantitySelector from "./QuantitySelector";

const CartItem = ({ item }: { item: Product }) => (
  <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
      <img src={item.image} alt={item.name} className="max-h-12 object-contain" />
    </div>
    <div className="flex-1">
      <div className="text-sm font-medium">{item.name}</div>
      <div className="text-xs text-gray-500">{item.brand} · {item.volume}</div>
      <div className="mt-1 flex items-center gap-3">
        <QuantitySelector item={item} />
        <div className="text-sm font-medium">
          {(item.price * item.quantity).toFixed(2).replace('.', ',')} kr
        </div>
      </div>
    </div>
  </div>
);

const Cart = () => {
  const { state } = useStore();
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-ica-red hover:bg-red-700 text-white border-none shadow-lg"
        >
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <div className="absolute -top-2 -right-2 bg-white text-ica-red rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
                {totalItems}
              </div>
            )}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:max-w-none">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Varukorg</span>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </SheetTrigger>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          {state.cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          {state.cart.length === 0 && (
            <div className="text-center text-gray-500">Din varukorg är tom</div>
          )}
        </div>
        {state.cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Totalt</span>
              <span className="font-medium">{totalPrice.toFixed(2).replace('.', ',')} kr</span>
            </div>
            <Button className="w-full bg-ica-red hover:bg-red-700">
              Gå till kassan
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;