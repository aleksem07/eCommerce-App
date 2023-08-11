import { Result } from "@Utils/error-handler/error-handler.type";
import ClientBuilderService from "./client-builder/client-builder";
import ErrorHandlerUtil from "@Utils/error-handler/error-handler";

class AuthService extends ClientBuilderService {
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
        error: "An error occurred while entering the email or password. Please, enter correct data",
      };
    }
  }

  handleAuthenticationResult(result: Result) {
    const errorHandler = new ErrorHandlerUtil("btn");
    errorHandler.handleResult(result, "Successful login");
  }

  async auth(username: string, password: string) {
    const result = await this.checkUserLogin(username, password);
    this.handleAuthenticationResult(result);
  }
}

export default class Auth {
  constructor() {
    this.check;
  }

  async check() {
    await this.waitForDomContentLoader();
    this.setupCheckButton();
  }

  waitForDomContentLoader() {
    return new Promise((resolve) => {
      window.addEventListener("DOMContentLoaded", () => {
        resolve({});
      });
    });
  }

  setupCheckButton() {
    const submitLogin = document.querySelector("#login-submit-button");
    const inputEmail = document.querySelector("#login-email-input") as HTMLInputElement;
    const inputPassword = document.querySelector("#password-input") as HTMLInputElement;

    if (submitLogin && inputEmail && inputPassword) {
      submitLogin.addEventListener("click", () => {
        const loginUser = new AuthService();
        loginUser.auth(inputEmail.value, inputPassword.value);
      });
    }
  }
}
