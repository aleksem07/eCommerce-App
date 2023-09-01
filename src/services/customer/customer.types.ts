export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  shippingAddresses?: Address;
  billingAddresses?: Address;
}

export interface Address {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}
