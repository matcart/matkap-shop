export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  children?: Category[];
  icon?: string;
}

export interface CategoriesMap {
  [key: string]: Category;
}

export interface CategoryResponse {
  id: string;
  name: string;
  parent_id: string | null;
}