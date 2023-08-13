export interface AuthResult {
  success: boolean;
  data?: {
    body: <T>() => Promise<T>;
    statusCode: number;
  };
  error?: string;
}
