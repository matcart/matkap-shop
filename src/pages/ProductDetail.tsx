import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ProductCard from '@/components/Products/ProductCard';

const products = [
  {
    id: '1',
    name: 'Mellanmjölk Färsk',
    price: 19.90,
    volume: '1,5 liter',
    brand: 'Arla',
    pricePerUnit: '13,93kr/l',
    image: '/lovable-uploads/342bd940-31eb-4e14-bcc1-177dad0228da.png',
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
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="mx-auto px-[39px]">
      <nav className="text-sm mb-8 text-gray-600">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                Tillbaka
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <div className="bg-white rounded-[20px] p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[300px] object-contain"
            />
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
            <div className="text-lg font-medium mb-1">{product.brand}</div>
            <div className="text-base bg-gray-100 rounded-full px-3 py-1 w-fit mb-2">
              {product.volume}
            </div>
            <div className="text-sm text-gray-600 mb-4">{product.pricePerUnit}</div>
            
            <div className="text-xl font-semibold mb-6">
              {product.price.toFixed(2)} kr
            </div>

            <ProductCard product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
