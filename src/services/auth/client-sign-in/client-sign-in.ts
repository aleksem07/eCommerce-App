import ClientBuilderService from "../client-builder/client-builder";

const URI = {
  GET_LOGIN: "/random-team-19/login",
};

export default class ClientSignInService extends ClientBuilderService {
  constructor() {
    super();
  }

  async checkUserLogin(username: string, password: string) {
    try {
      const data = await this.ctpClient?.execute({
        method: "POST",
        uri: URI.GET_LOGIN,
        body: {
          email: username,
          password: password,
        },
      });
      return data;
    } catch (error) {
      throw new Error("Error while getting user login");
    }
  }
}
