export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  volume: string;
  pricePerUnit: string;
  image: string;
  quantity: number;
  description?: string;
}

export interface ProductResponse {
  product_id: string;
  name: string;
  price: {
    amount: string;
    comparisonPrice: string;
  };
  brand?: string;
  size?: {
    text: string;
  };
  image?: {
    url: string;
  };
  description?: string;
}