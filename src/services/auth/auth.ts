import { HttpErrorType, TokenInfo } from "@commercetools/sdk-client-v2";
import ClientBuilderService from "../client-builder/client-builder";
import {
  AUTH_TOKEN_LS,
  AuthResult,
  DataInfo,
  LoginParams,
  RegistrationParams,
  TokenParams,
  SignUpParams,
} from "./auth.types";

export default class AuthService extends ClientBuilderService {
  constructor() {
    super();
  }

  async signIn(username: string, password: string): Promise<AuthResult<DataInfo | TokenInfo>> {
    const result = await this.getToken("/customers/token", {
      grant_type: "password",
      username,
      password,
      scopes: this.customersApiScope,
    });

    if (result.success && result.data?.access_token) {
      return await this.login({
        username,
        password,
        token: result.data?.access_token,
      });
    }

    return result;
  }

  async signUp({
    username,
    password,
    firstName,
    lastName,
    dateBirth,
    country,
    city,
    street,
    postalCode,
  }: SignUpParams): Promise<AuthResult<DataInfo | TokenInfo>> {
    const result = await this.getToken("/anonymous/token", {
      grant_type: "client_credentials",
      username,
      password,
      scopes: this.customersApiScope,
    });

    if (result.data?.access_token) {
      return await this.registration({
        username,
        password,
        firstName,
        lastName,
        dateBirth,
        country,
        city,
        street,
        postalCode,
        token: result.data?.access_token,
      });
    }

    return result;
  }

  private async getToken(url: string, requestParams: TokenParams): Promise<AuthResult<TokenInfo>> {
    try {
      const authUrl = `${this.authUrl}/oauth/${this.projectKey}${url}`;
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(requestParams)) {
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

      if (requestParams.username) {
        localStorage.setItem(AUTH_TOKEN_LS, data.access_token);
      }

      return { success: true, data };
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  private async login({ username, password, token }: LoginParams): Promise<AuthResult<DataInfo>> {
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
          password,
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

  async registration({ firstName, lastName, password, token, username }: RegistrationParams) {
    try {
      const data = await this.commercetoolsClient.execute({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        uri: `/${this.projectKey}/customers`,
        body: {
          firstName,
          lastName,
          email: username,
          password,
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
