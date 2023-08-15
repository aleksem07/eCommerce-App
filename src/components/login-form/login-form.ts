import LoginFormView from "./login-form.view";
import FormControlComponent from "@Components/form-control/form-control";
import FormCheckComponent from "@Components/form-check/form-check";
import AuthService from "@Services/auth/auth";
import TooltipComponent from "@Components/tooltip/tooltip";

export default class LoginFormComponent {
  emailInput: FormControlComponent;
  passwordInput: FormControlComponent;
  passwordCheck: FormCheckComponent;
  private view: LoginFormView;
  authService: AuthService;
  tooltip: TooltipComponent;

  constructor() {
    this.authService = new AuthService();
    this.tooltip = new TooltipComponent();
    this.view = new LoginFormView();
    this.emailInput = new FormControlComponent("login", "email", "Email", "Invalid email");
    this.passwordInput = new FormControlComponent(
      "login",
      "password",
      "Password",
      "Invalid password"
    );
    this.passwordCheck = new FormCheckComponent("login", "password");
    this.view.submitFormListener(this.submitFormHandler.bind(this));
  }

  async submitFormHandler(email: string, password: string) {
    const result = await this.authService.login(email, password);

    if (!result.success && result.error) {
      this.tooltip.show("Error", result.error);
    } else {
      this.tooltip.show("Success", "Welcome to the 'Fishing Hub'!");
    }
  }

  init() {
    const email = this.emailInput.init();
    const password = this.passwordInput.init();
    const showPassword = this.passwordCheck.init();
    this.view.render(email, password, showPassword);
    this.emailInput.init();
    this.passwordInput.init();
    this.passwordCheck.init();
    this.tooltip.init(this.view.submitButton as HTMLButtonElement);
  }
}
