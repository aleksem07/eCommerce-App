export interface Result {
  success: boolean;
  data?: {
    body: <T>() => Promise<T>;
    statusCode: number;
  };
  error?: string;
}
