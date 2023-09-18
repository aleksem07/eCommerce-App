import { Price } from "@Services/product/product.types";

export const USER_CART_ID_LS = "userCartId";

export const LINE_ITEMS_COUNT_LS = "lineItemsCount";

export const ANON_CART_ID_LS = "anonCartId";

export interface Cart {
  id: string;
  version: number;
  key: string;
  customerId: string;
  customerEmail: string;
  lineItems: LineItem[];
  totalPrice: Price;
  discountCodes?: DiscountCodeInfo[] | [];
}

interface DiscountCodeInfo {
  discountCode: { id: string };
}

export interface LineItem {
  id: string;
  quantity: number;
  productId: string;
  name: string;
  price: Price;
  discountedPrice?: Price;
  totalPrice: Price;
  images: string[];
}
