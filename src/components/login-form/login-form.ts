import LoginFormView from "./login-form.view";
import ValidatorUtil from "@Utils/validator/validator";

export default class LoginFormComponent {
  view: LoginFormView;
  validator: ValidatorUtil;

  constructor() {
    this.view = new LoginFormView();
    this.view.inputEmailListener(this.inputEmailHandler.bind(this));
    this.view.inputPasswordListener(this.inputPasswordHandler.bind(this));
    this.view.checkboxListener(this.checkboxHandler.bind(this));
    this.validator = new ValidatorUtil();
  }

  async inputEmailHandler(email: string) {
    const emailValid = await this.validator.validateEmail(email);
    this.view.handleInputValidationResult("email", emailValid);
  }

  async inputPasswordHandler(password: string) {
    const passwordValid = await this.validator.validatePassword(password);
    this.view.handleInputValidationResult("password", passwordValid);
  }

  async checkboxHandler(status: boolean, input: HTMLInputElement) {
    if (status) {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }

  init() {
    this.view.render();
  }
}
