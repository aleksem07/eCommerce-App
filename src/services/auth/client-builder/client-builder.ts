import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import NotificationHandlerUtil from "@Utils/notification-handler/notification-handler";

export default class ClientBuilderService {
  private commercetoolsClient;
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

  private errorHandler(errorMessage: string) {
    const errorUtil = new NotificationHandlerUtil("body");
    errorUtil.handleResult({ success: false, error: errorMessage });
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
    } else {
      this.errorHandler("Some required variables are not defined.");
    }
  }

  private initHttpMiddlewareOptions() {
    const apiUrl = process.env.API_URL;

    if (apiUrl) {
      this.httpMiddlewareOptions.host = apiUrl;
    } else {
      this.errorHandler("apiUrl is not defined.");
    }
  }

  get getClient() {
    return this.commercetoolsClient;
  }
}
