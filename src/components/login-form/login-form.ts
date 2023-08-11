import LoginFormView from "./login-form.view";
import ValidatorUtil from "@Utils/validator/validator";

export default class LoginFormComponent {
  view: LoginFormView;
  validator: ValidatorUtil;

  constructor() {
    this.view = new LoginFormView();
    this.validator = new ValidatorUtil();
    this.view.inputEmailListener(this.inputEmailHandler.bind(this));
    this.view.inputPasswordListener(this.inputPasswordHandler.bind(this));
    this.view.checkboxListener(this.checkboxHandler.bind(this));
  }

  async inputEmailHandler(email: string) {
    const emailValid = await this.validator.validateEmail(email);
    this.view.handleInputValidationResult("email", emailValid);
  }

  async inputPasswordHandler(password: string) {
    const passwordValid = await this.validator.validatePassword(password);
    this.view.handleInputValidationResult("password", passwordValid);
  }

  async checkboxHandler(status: boolean) {
    this.view.handleChecboxResult(status);
  }

  init() {
    this.view.render();
  }
}
