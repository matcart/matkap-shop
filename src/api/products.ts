import { supabase } from "@/integrations/supabase/client";
import { Product, ProductResponse } from "@/types/product";

export const getProducts = async (categoryId?: string): Promise<Product[]> => {
  const query = supabase.from('products').select('*');

  if (categoryId) {
    query.eq('category_id', categoryId);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data.map((product): Product => ({
    id: product.product_id,
    name: product.name,
    price: product.price?.amount ? Number(product.price.amount) : 0,
    brand: product.brand || '',
    volume: product.size?.text || '',
    pricePerUnit: product.price?.comparisonPrice || '',
    image: product.image?.url || '',
    quantity: 1,
    description: product.description,
  }));
};