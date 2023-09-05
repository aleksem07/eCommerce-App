import { Address, Customer } from "@Services/customer/customer.types";

export interface UserAddressProps {
  header: string;
  address: Address;
}

export type UserAddressFormData = Map<string, string>;

export type CustomerInfo = Pick<
  Customer,
  "firstName" | "lastName" | "email" | "dateOfBirth" | "id" | "version"
>;

export interface UserAddressElements {
  countryInput: HTMLElement;
  cityInput: HTMLElement;
  streetInput: HTMLElement;
  postalCodeInput: HTMLElement;
  isDefaultAddress: HTMLElement;
  isEditMode: boolean;
}
