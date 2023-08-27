export interface Product {
  title: string;
  description: string;
  imageUrl: string;
  price: Price;
  discountedPrice?: Price;
  id: string;
  color?: string;
  size?: string;
}

export interface Price {
  currencyCode: string;
  value: number;
}
