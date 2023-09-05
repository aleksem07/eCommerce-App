export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  version: number;
  addresses: Address[];
}

export type CustomerInfo = Pick<
  Customer,
  "firstName" | "lastName" | "email" | "dateOfBirth" | "id" | "version"
>;

export type CustomerPassword = Pick<Customer, "id" | "version">;

export interface Address {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
  isDefaultAddress: boolean;
  isShippingAddress: boolean;
  isBillingAddress: boolean;
  name: string;
}
