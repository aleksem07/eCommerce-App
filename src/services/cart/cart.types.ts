export const USER_CART_ID_LS = "userCartId";

export const ANON_CART_ID_LS = "anonCartId";

export interface Cart {
  id: string;
  version: number;
  key: string;
  customerId: string;
  customerEmail: string;
  lineItems: LineItem[];
  totalPrice: CentPrecisionMoney;
}

export interface LineItem {
  quantity: number;
  productId: string;
}

export interface CentPrecisionMoney {
  centAmount: number;
  currencyCode: string;
}
