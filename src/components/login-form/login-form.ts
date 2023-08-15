import LoginFormView from "./login-form.view";
import ValidatorUtil from "@Utils/validator/validator";
import AuthService from "@Services/auth/auth";
import TooltipComponent from "@Components/tooltip/tooltip";
import RouterService from "@Services/router/router";
import { Routes } from "@Services/router/router.types";

export default class LoginFormComponent {
  view: LoginFormView;
  validator: ValidatorUtil;
  authService: AuthService;
  tooltip: TooltipComponent;

  constructor() {
    this.view = new LoginFormView();
    this.validator = new ValidatorUtil();
    this.authService = new AuthService();
    this.tooltip = new TooltipComponent();

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
    this.view.handleCheckboxResult(status);
  }

  async submitFormHandler(email: string, password: string) {
    const result = await this.authService.login(email, password);

    if (!result.success && result.error) {
      this.tooltip.show("Error", result.error);
    } else {
      RouterService.navigateTo(Routes.MAIN);
    }
  }

  init() {
    this.view.render();
    this.tooltip.init(this.view.loginSubmitButton);
  }
}
