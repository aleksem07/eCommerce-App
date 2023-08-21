export interface DataInfo {
  body: <T>() => Promise<T>;
  statusCode: number;
}

export interface AuthResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface TokenParams {
  grant_type: string;
  scopes: string;
  username?: string;
  password?: string;
}

export interface LoginParams {
  username: string;
  password: string;
  token: string;
}

export interface RegistrationParams extends SignUpParams {
  token: string;
}

export interface SignUpParams {
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
