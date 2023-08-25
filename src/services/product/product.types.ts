export interface Product {
  title: string;
  description: string;
  imageUrl: string;
  color: string;
  size: string;
  price: Price;
  discountedPrice?: Price;
  id: string;
}

export interface Price {
  currencyCode: string;
  value: number;
}
