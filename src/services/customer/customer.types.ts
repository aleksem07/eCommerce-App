export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  shippingAddress: Address;
  billingAddress?: Address;
}

export interface Address {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}
