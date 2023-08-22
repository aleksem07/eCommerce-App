import {
  ClientBuilder,
  HttpErrorType,
  type HttpMiddlewareOptions,
  type Client,
} from "@commercetools/sdk-client-v2";

import { ApiRoot, createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

export default class ClientBuilderService {
  protected commercetoolsClient: Client;
  protected apiRoot: ApiRoot;

  protected authUrl = "";
  protected apiUrl = "";
  protected projectKey = "";
  protected scopes = "";
  protected adminID = "";
  protected adminSecret = "";
  protected clientID = "";
  protected clientSecret = "";
  protected customersApiSecret = "";
  protected customersApiID = "";
  protected customersApiScope = "";

  private httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: "",
    fetch,
  };

  constructor() {
    this.init();
    this.initHttpMiddlewareOptions();

    this.commercetoolsClient = new ClientBuilder()
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    this.apiRoot = createApiBuilderFromCtpClient(this.commercetoolsClient);
  }

  private init() {
    this.projectKey = process.env.PROJECT_KEY || "";
    this.authUrl = process.env.AUTH_URL || "";
    this.scopes = process.env.SCOPES || "";
    this.adminID = process.env.ADMIN_ID || "";
    this.adminSecret = process.env.ADMIN_SECRET || "";
    this.clientID = process.env.CLIENT_ID || "";
    this.clientSecret = process.env.CLIENT_SECRET || "";
    this.customersApiID = process.env.CUSTOMERS_API_ID || "";
    this.customersApiSecret = process.env.CUSTOMERS_API_SECRET || "";
    this.customersApiScope = process.env.CUSTOMERS_API_SCOPE || "";
  }

  private initHttpMiddlewareOptions() {
    this.apiUrl = process.env.API_URL || "";

    if (this.apiUrl) {
      this.httpMiddlewareOptions.host = this.apiUrl;
    }
  }

  protected async execute<T>(uri: string, token: string, body: Record<string, T>) {
    try {
      const data = await this.commercetoolsClient.execute({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        uri,
        body,
      });

      return { success: true, data };
    } catch (error: unknown) {
      const errorMessage = (error as HttpErrorType).message;

      return { success: false, error: errorMessage };
    }
  }
}
