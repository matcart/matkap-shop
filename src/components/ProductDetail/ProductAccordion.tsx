import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Product } from '@/types/product';

interface ProductAccordionProps {
  product: Product;
}

const ProductAccordion = ({ product }: ProductAccordionProps) => {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm">
      <Accordion type="single" collapsible className="w-full [&>*:last-child]:border-none">
        <AccordionItem value="description" className="pt-0">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            Produktfakta
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-700 mb-8">{product.description}</p>
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

        <AccordionItem value="nutrition">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            Näringsvärde
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-700">Näringsvärde per 100 ml:</p>
            <p className="text-gray-700">Energi: 46 kcal/192 kJ</p>
            <p className="text-gray-700">Fett: 1,5 g</p>
            <p className="text-gray-700">Kolhydrater: 4,9 g</p>
            <p className="text-gray-700">Protein: 3,4 g</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductAccordion;