import { HttpErrorType, TokenInfo } from "@commercetools/sdk-client-v2";
import ClientBuilderService from "../client-builder/client-builder";
import { AUTH_TOKEN_LS, AuthResult, DataInfo } from "./auth.types";

export default class AuthService extends ClientBuilderService {
  constructor() {
    super();
  }

  async signIn(username: string, password: string): Promise<AuthResult<DataInfo | TokenInfo>> {
    const result = await this.getToken(username, password);

    if (result.success && result.data?.access_token) {
      return await this.login(username, password, result.data?.access_token);
    }

    return result;
  }

  private async getToken(username: string, password: string): Promise<AuthResult<TokenInfo>> {
    try {
      const authUrl = `${this.authUrl}/oauth/${this.projectKey}/customers/token`;

      const params = new URLSearchParams();
      params.append("grant_type", "password");
      params.append("username", username);
      params.append("password", password);
      params.append("scopes", this.customersApiScope);

      const encodedCredentials = btoa(`${this.customersApiID}:${this.customersApiSecret}`);

      const response = await fetch(authUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data: TokenInfo = await response.json();
      localStorage.setItem(AUTH_TOKEN_LS, data.access_token);

      return { success: true, data };
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  private async login(
    username: string,
    password: string,
    token: string
  ): Promise<AuthResult<DataInfo>> {
    try {
      const data = await this.commercetoolsClient.execute({
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        uri: `/${this.projectKey}/login`,
        body: {
          email: username,
          password: password,
        },
      });

      return { success: true, data };
    } catch (error: unknown) {
      const errorMessage = (error as HttpErrorType).message;

      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}
