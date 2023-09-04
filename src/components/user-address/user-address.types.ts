import { Address } from "@Services/customer/customer.types";

export interface UserAddressProps {
  header: string;
  formName: string;
  address: Address;
}
