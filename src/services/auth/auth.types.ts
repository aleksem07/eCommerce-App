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

export interface RegistrationProps extends SignUpProps {
  token: string;
}

export interface SignUpProps {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  country: string;
  city: string;
  street: string;
  postalCode: string;
}

export const AUTH_TOKEN_LS = "authToken";
