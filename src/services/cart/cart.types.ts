export interface Cart {
  id: string;
  version: number;
  key: string;
  customerId: string;
  customerEmail: string;
  lineItems: LineItem[];
  totalPrice: CentPrecisionMoney;
}

interface LineItem {
  quantity: number;
}

export interface CentPrecisionMoney {
  centAmount: number;
  currencyCode: string;
}
