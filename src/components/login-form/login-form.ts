import LoginFormView from "./login-form.view";
import ValidatorUtil from "@Utils/validator/validator";
import AuthService from "@Services/auth/auth";
import FormInputComponent from "@Components/form-input/form-input";
import FormComponent from "@Components/form/form";

export default class LoginFormComponent {
  form: FormComponent;
  view: LoginFormView;
  validator: ValidatorUtil;
  authService: AuthService;
  emailInput: FormInputComponent;
  passInput: FormInputComponent;

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
    this.view.submitFormListener(this.submitFormHandler.bind(this));
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
    this.form.init();
    this.emailInput.init();
    this.passInput.init();
  }
}
