export interface DataInfo {
  body: <T>() => Promise<T>;
  statusCode: number;
}

export interface AuthResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface TokenProps {
  grant_type: string;
  scopes: string;
  username?: string;
  password?: string;
}

export interface LoginProps {
  username: string;
  password: string;
  token: string;
}

export interface RegistrationProps extends LoginProps {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
}

export interface Address {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}

export interface AddressIDProps {
  customerId: string;
  addressId: string;
  token: string;
}

export const AUTH_TOKEN_LS = "authToken";

export const ADDRESS_ID_SS = "addressId";

export const CUSTOMER_ID_SS = "customerId";
