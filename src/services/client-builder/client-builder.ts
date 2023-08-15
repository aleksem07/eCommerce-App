import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type Client,
} from "@commercetools/sdk-client-v2";

import { ApiRoot, createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

export default class ClientBuilderService {
  protected authUrl?: string;
  protected apiUrl?: string;
  protected projectKey?: string;
  protected commercetoolsClient: Client;
  protected apiRoot: ApiRoot;
  protected scopes = "";
  protected adminID?: string;
  protected adminSecret?: string;
  protected clientID?: string;
  protected clientSecret?: string;

  private httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: "",
    fetch,
  };

  constructor() {
    this.projectKey = process.env.PROJECT_KEY || "";
    this.authUrl = process.env.AUTH_URL || "";
    this.scopes = process.env.SCOPES || "";
    this.adminID = process.env.ADMIN_ID;
    this.adminSecret = process.env.ADMIN_SECRET;
    this.clientID = process.env.CLIENT_ID;
    this.clientSecret = process.env.CLIENT_SECRET;

    this.initHttpMiddlewareOptions();

    this.commercetoolsClient = new ClientBuilder()
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    this.apiRoot = createApiBuilderFromCtpClient(this.commercetoolsClient);
  }

  private initHttpMiddlewareOptions() {
    this.apiUrl = process.env.API_URL || "";

    if (this.apiUrl) {
      this.httpMiddlewareOptions.host = this.apiUrl;
    }
  }
}
