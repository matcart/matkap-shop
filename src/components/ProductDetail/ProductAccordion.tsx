import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Product } from '@/types/product';

interface ProductAccordionProps {
  product: Product;
}

const ProductAccordion = ({ product }: ProductAccordionProps) => {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm">
      <Accordion 
        type="multiple" 
        defaultValue={["description", "origin", "brand", "ingredients"]} 
        className="w-full [&>*:last-child]:border-none"
      >
        <AccordionItem value="description" className="pt-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            Produktinformation
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-700 mb-8">{product.description}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="origin">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            Ursprungsland
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-700">{product.countryOfOrigin}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            Varumärke
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-700">{product.brand_full}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ingredients">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            Ingredienser
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-700">EKOLOGISK MELLANMJÖLK</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductAccordion;