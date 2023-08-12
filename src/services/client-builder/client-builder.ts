import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type Client,
} from "@commercetools/sdk-client-v2";

export default class ClientBuilderService {
  private commercetoolsClient: Client;

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
  }

  private initAuthMiddlewareOptions() {
    const projectKey = process.env.PROJECT_KEY;
    const scopes = process.env.SCOPES?.split(",").filter(Boolean);
    const authUrl = process.env.AUTH_URL;
    const adminID = process.env.ADMIN_ID;
    const adminSecret = process.env.ADMIN_SECRET;

    if (authUrl && projectKey && adminID && adminSecret && scopes) {
      this.authMiddlewareOptions = {
        host: authUrl,
        projectKey: projectKey,
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
    const apiUrl = process.env.API_URL;

    if (apiUrl) {
      this.httpMiddlewareOptions.host = apiUrl;
    }
  }

  get getClient() {
    return this.commercetoolsClient;
  }
}
