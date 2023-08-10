import { ClientBuilder } from "@commercetools/sdk-client-v2";
import { authMiddleware, httpMiddleware } from "./client-builder.types";

export default class ClientBuilderService {
  protected authMiddlewareOptions: authMiddleware;
  protected httpMiddlewareOptions: httpMiddleware = {
    host: "",
    fetch,
  };
  protected ctpClient;

  constructor() {
    const projectKey = process.env.CTP_PROJECT_KEY;
    const scopes = process.env.CTP_SCOPES?.split(",").filter(Boolean);
    const authUrl = process.env.CTP_AUTH_URL;
    const apiUrl = process.env.CTP_API_URL;
    const adminID = process.env.CTP_ADMIN_ID;
    const adminSecret = process.env.CTP_ADMIN_SECRET;

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
    } else {
      throw new Error("Some required variables are not defined.");
    }

    if (apiUrl) {
      this.httpMiddlewareOptions.host = apiUrl;
    } else {
      throw new Error("apiUrl is not defined.");
    }

    this.ctpClient = new ClientBuilder()
      .withClientCredentialsFlow(this.authMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }
}
