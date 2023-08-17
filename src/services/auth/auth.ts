import { HttpErrorType, TokenInfo } from "@commercetools/sdk-client-v2";
import ClientBuilderService from "../client-builder/client-builder";
import { AUTH_TOKEN_LS, AuthResult, DataInfo, ParamsProps } from "./auth.types";

export default class AuthService extends ClientBuilderService {
  constructor() {
    super();
  }

  async signIn(username: string, password: string): Promise<AuthResult<DataInfo | TokenInfo>> {
    const result = await this.getToken("/customers/token", {
      grant_type: "password",
      username: username,
      password: password,
      scopes: this.customersApiScope,
    });

    if (result.success && result.data?.access_token) {
      return await this.login(username, password, result.data?.access_token);
    }

    return result;
  }

  async signUp(
    username: string,
    password: string,
    firsName: string,
    lastName: string
  ): Promise<AuthResult<DataInfo | TokenInfo>> {
    const result = await this.getToken("/anonymous/token", {
      grant_type: "client_credentials",
      username: username,
      password: password,
      scopes: this.customersApiScope,
    });

    if (result.data?.access_token) {
      return await this.register(username, password, firsName, lastName, result.data?.access_token);
    }

    return result;
  }

  private async getToken(url: string, paramsProps: ParamsProps): Promise<AuthResult<TokenInfo>> {
    try {
      const authUrl = `${this.authUrl}/oauth/${this.projectKey}${url}`;
      const params = new URLSearchParams();
      let key: keyof ParamsProps;
      for (key in paramsProps) {
        const value = paramsProps[key];

        if (value) {
          params.append(key, value);
        }
      }
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

  async register(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    token: string
  ) {
    try {
      const data = await this.commercetoolsClient.execute({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        uri: `/${this.projectKey}/customers`,
        body: {
          firstName: firstName,
          lastName: lastName,
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
