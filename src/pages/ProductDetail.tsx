import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { useStore } from '@/contexts/StoreContext';
import { Plus, Minus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const products = [
  {
    id: '1',
    name: 'Mellanmjölk Färsk Ekologisk',
    price: 20.90,
    volume: '1,5 liter',
    brand: 'Arla',
    pricePerUnit: '13,93kr/l',
    image: '/lovable-uploads/342bd940-31eb-4e14-bcc1-177dad0228da.png',
    description: 'Färsk mellanmjölk från Arla, gjord på svensk mjölk från Arlagårdar nu med ännu bättre djuromsorg hela året runt. Mellanmjölk har en härligt fyllig mjölksmak och är ett populärt val till frukostflingorna, gröten eller som dryck till måltiden. Arla Ko® färsk mellanmjölk är en naturlig källa till bland annat protein, kalcium och vitamin B12. Protein bidrar till muskeluppbyggnad och kalcium behövs för att bibehålla en normal benstomme. Varumärket Arla Ko® garanterar att produkten är gjord på 100 procent svensk mjölk.',
    countryOfOrigin: 'Sverige',
    brand_full: 'Arla Ko',
    quantity: 0,
  },
  {
    id: '2',
    name: 'Mellanmjölk Längre Hållbarhet',
    price: 19.90,
    volume: '1,5 liter',
    brand: 'ICA',
    pricePerUnit: '14,60kr/l',
    image: '/lovable-uploads/342bd940-31eb-4e14-bcc1-177dad0228da.png',
    quantity: 0,
  },
  {
    id: '3',
    name: 'Mellanmjölk Färsk Ekologisk',
    price: 24.90,
    volume: '1,5 liter',
    brand: 'Arla',
    pricePerUnit: '16,60kr/l',
    image: '/lovable-uploads/342bd940-31eb-4e14-bcc1-177dad0228da.png',
    quantity: 0,
  },
  {
    id: '4',
    name: 'Standardmjölk Färsk',
    price: 23.90,
    volume: '1,5 liter',
    brand: 'Arla',
    pricePerUnit: '15,93kr/l',
    image: '/lovable-uploads/342bd940-31eb-4e14-bcc1-177dad0228da.png',
    quantity: 0,
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const { state, dispatch } = useStore();
  const product = products.find(p => p.id === id);
  const cartItem = state.cart.find(item => item?.id === product?.id);
  const quantity = cartItem?.quantity || 0;

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity: 0 }
    });
  };

  return (
    <div className="mx-auto px-[39px] pb-12">
      <nav className="text-sm mb-8 text-gray-600">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-2 font-medium">
                <ChevronLeft className="w-4 h-4" />
                Tillbaka
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <div className="bg-white rounded-[20px] p-8 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[300px] object-contain"
            />
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
            <div className="text-sm bg-gray-100 rounded-full px-3 py-1 w-fit mb-2">
              {product.volume}
            </div>
            <div className="text-base mb-1">{product.brand}</div>
            <div className="text-sm text-gray-600 mb-6">{product.pricePerUnit}</div>
            
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
                Köp
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[20px] p-8 shadow-sm">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="description">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              Produktinformation
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700 mb-8">{product.description}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="origin">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              Ursprungsland
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700">{product.countryOfOrigin}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="brand">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              Varumärke
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700">{product.brand_full}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ingredients">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              Ingredienser
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700">EKOLOGISK MELLANMJÖLK</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ProductDetail;