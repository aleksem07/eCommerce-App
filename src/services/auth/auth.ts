import ClientBuilderService from "../client-builder/client-builder";

export default class AuthService extends ClientBuilderService {
  constructor() {
    super();
  }

  private async checkUserLogin(username: string, password: string) {
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
      const errorMessage = (error as Error).message;

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  get checkClient() {
    return this.checkUserLogin;
  }
}
