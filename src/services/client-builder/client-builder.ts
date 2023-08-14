import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type Client,
} from "@commercetools/sdk-client-v2";

import { ApiRoot, createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

export default class ClientBuilderService {
  protected authUrl!: string;
  protected apiUrl!: string;
  protected projectKey!: string;

  protected commercetoolsClient: Client;

  protected apiRoot: ApiRoot;

  private authMiddlewareOptions: AuthMiddlewareOptions = {
    host: "",
    projectKey: "",
    credentials: {
      clientId: "",
      clientSecret: "",
    },
  };

  private httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: "",
    fetch,
  };

  constructor() {
    this.initAuthMiddlewareOptions();
    this.initHttpMiddlewareOptions();

    this.commercetoolsClient = new ClientBuilder()
      .withClientCredentialsFlow(this.authMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    this.apiRoot = createApiBuilderFromCtpClient(this.commercetoolsClient);
  }

  private initAuthMiddlewareOptions() {
    this.projectKey = process.env.PROJECT_KEY || "";
    this.authUrl = process.env.AUTH_URL || "";
    const scopes = process.env.SCOPES?.split(",").filter(Boolean);
    const adminID = process.env.ADMIN_ID;
    const adminSecret = process.env.ADMIN_SECRET;

    if (this.authUrl && this.projectKey && adminID && adminSecret && scopes) {
      this.authMiddlewareOptions = {
        host: this.authUrl,
        projectKey: this.projectKey,
        credentials: {
          clientId: adminID,
          clientSecret: adminSecret,
        },
        scopes,
        fetch,
      };
    }
  }

  private initHttpMiddlewareOptions() {
    this.apiUrl = process.env.API_URL || "";

    if (this.apiUrl) {
      this.httpMiddlewareOptions.host = this.apiUrl;
    }
  }
}
