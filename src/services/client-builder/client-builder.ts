import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type Client,
} from "@commercetools/sdk-client-v2";

import { ApiRoot, createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

export default class ClientBuilderService {
  protected commercetoolsClient: Client;
  protected apiRoot: ApiRoot;

  protected authUrl?: string = "";
  protected apiUrl?: string = "";
  protected projectKey?: string = "";
  protected scopes = "";
  protected adminID?: string = "";
  protected adminSecret?: string = "";
  protected clientID?: string = "";
  protected clientSecret?: string = "";
  protected customersApiSecret?: string = "";
  protected customersApiID?: string = "";
  protected customersApiScope = "";
  // protected customerAnonApiID = "";
  // protected customerAnonApiSecret = "";
  protected customerAnonApiScope = "";

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
    // this.customersApiID = process.env.CUSTOMERS_API_ID || "";
    // this.customersApiSecret = process.env.CUSTOMERS_API_SECRET || "";
    this.customersApiScope = process.env.CUSTOMERS_API_SCOPE || "";
    this.customersApiID = process.env.CTP_CLIENT_ID || "";
    this.customersApiSecret = process.env.CTP_CLIENT_SECRET || "";
    this.customersApiScope = process.env.CTP_SCOPE || "";
  }

  private initHttpMiddlewareOptions() {
    this.apiUrl = process.env.API_URL || "";

    if (this.apiUrl) {
      this.httpMiddlewareOptions.host = this.apiUrl;
    }
  }
}
