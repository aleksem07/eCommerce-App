import { HttpErrorType } from "@commercetools/sdk-client-v2";
import ClientBuilderService from "../client-builder/client-builder";
import { AuthResult } from "./auth.types";

export default class AuthService extends ClientBuilderService {
  constructor() {
    super();
  }

  private async login(username: string, password: string): Promise<AuthResult> {
    try {
      const data = await this.commercetoolsClient.execute({
        method: "POST",
        uri: `/${this.projectKey}/login`,
        body: {
          email: username,
          password: password,
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

  get checkClient() {
    return this.login;
  }
}
