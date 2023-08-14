import LoginFormView from "./login-form.view";
import ValidatorUtil from "@Utils/validator/validator";
import AuthService from "@Services/auth/auth";
import FormInputComponent from "@Components/form-input/form-input";
import FormComponent from "@Components/form/form";
import TooltipComponent from "@Components/tooltip/tooltip";

export default class LoginFormComponent {
  form: FormComponent;
  view: LoginFormView;
  validator: ValidatorUtil;
  authService: AuthService;
  emailInput: FormInputComponent;
  passInput: FormInputComponent;
  tooltip: TooltipComponent;


  constructor() {
    this.form = new FormComponent("login");
    this.view = new LoginFormView();
    this.validator = new ValidatorUtil();
    this.authService = new AuthService();

    this.emailInput = new FormInputComponent("login", "email", "E-mail", "Write your email", false);
    this.passInput = new FormInputComponent(
      "login",
      "password",
      "Password",
      "Write your password",
      true
    );
    this.tooltip = new TooltipComponent();

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

    this.form.init();
    this.emailInput.init();
    this.passInput.init();
    this.tooltip.init(this.view.loginSubmitButton);
  }
}
