import { Result } from "@Utils/error-handler/error-handler.type";
import ClientBuilderService from "./client-builder/client-builder";
import ErrorHandlerUtil from "@Utils/error-handler/error-handler";

export default class AuthService extends ClientBuilderService {
  constructor() {
    super();
  }

  async checkUserLogin(username: string, password: string) {
    try {
      const data = await this.getClient.execute({
        method: "POST",
        uri: "/random-team-19/login",
        body: {
          email: username,
          password: password,
        },
      });
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: "An error occurred while entering the username or password.",
      };
    }
  }

  handleAuthenticationResult(result: Result) {
    const errorHandler = new ErrorHandlerUtil();
    errorHandler.handleResult(result, "successful login");
  }

  async auth(username: string, password: string) {
    const result = await this.checkUserLogin(username, password);
    this.handleAuthenticationResult(result);
  }
}

const loginUser = new AuthService();
loginUser.auth("ivan@ivanov.com", "password1");
loginUser.auth("ivan@ivanov.com", "password");
