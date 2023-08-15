import LoginFormView from "./login-form.view";
import FormControlComponent from "@Components/form-control/form-control";
import FormCheckComponent from "@Components/form-check/form-check";
import AuthService from "@Services/auth/auth";
import TooltipComponent from "@Components/tooltip/tooltip";
import ValidatorUtil from "@Utils/validator/validator";

export default class LoginFormComponent {
  emailInput: FormControlComponent;
  passwordInput: FormControlComponent;
  passwordCheck: FormCheckComponent;
  private view: LoginFormView;
  authService: AuthService;
  tooltip: TooltipComponent;
  validator: ValidatorUtil;

  constructor() {
    this.validator = new ValidatorUtil();

    this.authService = new AuthService();

    this.tooltip = new TooltipComponent();

    this.view = new LoginFormView();

    this.emailInput = new FormControlComponent({
      formName: "login",
      inputName: "email",
      labelText: "Email",
      helpText: "Write your email",
    });

    this.passwordInput = new FormControlComponent({
      formName: "login",
      inputName: "password",
      labelText: "Password",
      helpText: "Write your password",
    });

    this.passwordCheck = new FormCheckComponent({ formName: "login", inputName: "password" });

    this.view.submitFormListener(this.submitFormHandler.bind(this));
  }

  async submitFormHandler(email: string, password: string) {
    const emailValid = await this.validator.validate("email", email);
    const passwordValid = await this.validator.validate("password", password);

    if (emailValid?.isValid && passwordValid?.isValid) {
      const result = await this.authService.login(email, password);

      if (!result.success && result.error) {
        this.tooltip.show("Error", result.error);
      } else {
        this.tooltip.show("Success", "Welcome to the 'Fishing Hub'!");
      }
    }
  }

  async checkboxHandler(status: boolean) {
    this.view.handleCheckboxResult(status);
  }

  init() {
    const email = this.emailInput.init();
    const password = this.passwordInput.init();
    const showPassword = this.passwordCheck.init();
    this.view.render(email, password, showPassword);
    this.view.checkboxListener(this.checkboxHandler.bind(this));
    this.tooltip.init(this.view.submitButton);
  }
}
