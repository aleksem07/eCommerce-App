import { TokenInfo } from "@commercetools/sdk-client-v2";
import ClientBuilderService from "../client-builder/client-builder";
import {
  AUTH_TOKEN_LS,
  AuthResult,
  DataInfo,
  LoginParams,
  RegistrationParams,
  TokenParams,
  SignUpParams,
  USERNAME_LS,
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
    dateOfBirth,
    addresses,
    shippingAddresses,
    defaultShippingAddress,
    billingAddresses,
    defaultBillingAddress,
  }: SignUpParams): Promise<AuthResult<DataInfo | TokenInfo>> {
    const result = await this.getAnonymousToken(username, password);

    if (result.data?.access_token) {
      return await this.registration({
        username,
        password,
        firstName,
        lastName,
        dateOfBirth,
        addresses,
        shippingAddresses,
        defaultShippingAddress,
        billingAddresses,
        defaultBillingAddress,
        token: result.data?.access_token,
      });
    }

    return result;
  }

  private async getAnonymousToken(
    username?: string,
    password?: string
  ): Promise<AuthResult<TokenInfo>> {
    return await this.getToken("/anonymous/token", {
      grant_type: "client_credentials",
      username,
      password,
      scopes: this.customersApiScope,
    });
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

      this.saveDataToLocalStorage(requestParams, data);

      return { success: true, data };
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  private saveDataToLocalStorage(requestParams: TokenParams, data: TokenInfo) {
    if (requestParams.username) {
      localStorage.setItem(AUTH_TOKEN_LS, data.access_token);
      localStorage.setItem(USERNAME_LS, requestParams.username);
    }
  }

  private async login({ username, password, token }: LoginParams): Promise<AuthResult<DataInfo>> {
    return await this.execute(`/${this.projectKey}/login`, token, {
      email: username,
      password,
    });
  }

  async registration({
    firstName,
    lastName,
    password,
    token,
    username,
    dateOfBirth,
    addresses,
    shippingAddresses,
    defaultShippingAddress,
    billingAddresses,
    defaultBillingAddress,
  }: RegistrationParams) {
    return await this.execute(`/${this.projectKey}/customers`, token, {
      firstName,
      lastName,
      email: username,
      password,
      dateOfBirth,
      addresses,
      shippingAddresses,
      defaultShippingAddress,
      billingAddresses,
      defaultBillingAddress,
    });
  }

  async retrieveToken() {
    let token = localStorage.getItem(AUTH_TOKEN_LS);

    if (!token) {
      const result = await this.getAnonymousToken();

      if (result.data?.access_token) {
        token = result.data?.access_token;
      }
    }

    return token;
  }
}
