export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  shippingAddress: Address;
  billingAddress?: Address;
  version: number;
  password?: string;
}

export type CustomerInfo = Pick<
  Customer,
  "firstName" | "lastName" | "email" | "dateOfBirth" | "id" | "version"
>;

export type CustomerPassword = Pick<Customer, "id" | "version" | "password">;

export interface Address {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
  isDefaultAddress: boolean;
}
