import { useParams } from 'react-router-dom';
import ProductHeader from '@/components/ProductDetail/ProductHeader';
import ProductInfo from '@/components/ProductDetail/ProductInfo';
import ProductAccordion from '@/components/ProductDetail/ProductAccordion';

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
    description: '',
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
    description: '',
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
    description: '',
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
    <div className="mx-auto px-[39px] pb-12">
      <ProductHeader />

      <div className="bg-white rounded-[20px] p-8 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[300px] object-contain"
            />
          </div>
          
          <ProductInfo product={product} />
        </div>
      </div>

      <ProductAccordion product={product} />
    </div>
  );
};

export default ProductDetail;