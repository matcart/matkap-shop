import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import { MOCK_PRODUCTS } from "@/constants/mockProducts";

export const getProducts = async (categoryId?: string, searchQuery?: string): Promise<Product[]> => {
  const query = supabase.from('products').select('*');

  if (categoryId) {
    query.eq('category_id', categoryId);
  }

  if (searchQuery) {
    query.ilike('name', `%${searchQuery}%`);
  }

  const { data, error } = await query;
  if (error) throw error;

  // If we're in the demo store and the category is 'Frukt & Grönt'
  // and we have no results, return mock products
  const isDemoStore = store?.name === 'Demo';
  const isFruktOchGront = categoryId === 'frukt-och-gront';
  
  if (isDemoStore && isFruktOchGront && (!data || data.length === 0)) {
    return MOCK_PRODUCTS;
  }

  return data.map((product): Product => ({
    id: product.product_id,
    name: product.name,
    price: product.price && typeof product.price === 'object' && 'amount' in product.price 
      ? Number(product.price.amount) 
      : 0,
    brand: '',
    volume: product.size && typeof product.size === 'object' && 'text' in product.size 
      ? product.size.text as string 
      : '',
    pricePerUnit: product.price && typeof product.price === 'object' && 'comparisonPrice' in product.price 
      ? product.price.comparisonPrice as string 
      : '',
    image: product.image && typeof product.image === 'object' && 'url' in product.image 
      ? product.image.url as string 
      : '',
    quantity: 1,
    description: '',
  }));
};