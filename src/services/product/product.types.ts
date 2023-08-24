export interface Product {
  title: string;
  description: string;
  imageUrl: string;
  price: Price;
  discountedPrice?: Price;
}

export interface Price {
  currencyCode: string;
  value: number;
}
