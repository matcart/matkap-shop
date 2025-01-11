import { supabase } from "@/integrations/supabase/client";
import { Category, CategoryResponse } from "@/types/categories";

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) throw error;

  return data.map((category: CategoryResponse): Category => ({
    id: category.id,
    name: category.name,
    parentId: category.parent_id,
    icon: category.id === 'erbjudanden' ? '/lovable-uploads/00ac429b-336d-455a-b07a-c5e9722254c3.png' : undefined
  }));
};