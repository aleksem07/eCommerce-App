export interface Product {
  title: string;
  description: string;
  images: string[];
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

export interface PriceRange {
  minPrice: string;
  maxPrice: string;
}

export interface FilterProductsProps {
  size: string;
  color: string;
  priceRange: PriceRange;
  sort: string;
  categoryId?: string;
}
