export interface DataInfo {
  body: <T>() => Promise<T>;
  statusCode: number;
}

export interface AuthResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ParamsProps {
  grant_type: string;
  scopes: string;
  username?: string;
  password?: string;
}

export const AUTH_TOKEN_LS = "authToken";
