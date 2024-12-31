export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  brand: string;
  volume: string;
  brand_full?: string;
  countryOfOrigin?: string;
  quantity: number;
}