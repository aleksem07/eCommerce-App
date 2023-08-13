import LoginFormView from "./login-form.view";
import ValidatorUtil from "@Utils/validator/validator";
import AuthService from "@Services/auth/auth";

export default class LoginFormComponent {
  view: LoginFormView;
  validator: ValidatorUtil;
  authService: AuthService;

  constructor() {
    this.view = new LoginFormView();
    this.validator = new ValidatorUtil();
    this.authService = new AuthService();

    this.view.inputEmailListener(this.inputEmailHandler.bind(this));
    this.view.inputPasswordListener(this.inputPasswordHandler.bind(this));
    this.view.checkboxListener(this.checkboxHandler.bind(this));
    this.view.submitFormListener(this.submitFormHandler.bind(this));
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

  async submitFormHandler(email: string, password: string) {
    const result = await this.authService.checkClient(email, password);

    if (result.success) {
      this.view.showNotification(result, "Welcome to the 'Fishing Hub'!");
    } else if (result.error) {
      this.view.showNotification(result, result.error);
    }
  }

  init() {
    this.view.render();
  }
}
