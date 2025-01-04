export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  volume: string;
  pricePerUnit: string;
  quantity: number;
  description?: string;
  countryOfOrigin?: string;
  brand_full?: string;
}