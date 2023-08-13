import LoginFormView from "./login-form.view";
import ValidatorUtil from "@Utils/validator/validator";
import Auth from "@Services/auth/auth";
import FormInputComponent from "@Components/form-input/form-input";
import FormComponent from "@Components/form/form";

export default class LoginFormComponent {
  form: FormComponent;
  view: LoginFormView;
  validator: ValidatorUtil;
  auth: Auth;
  emailInput: FormInputComponent;
  passInput: FormInputComponent;

  constructor() {
    this.form = new FormComponent("login");
    this.view = new LoginFormView();
    this.validator = new ValidatorUtil();
    this.auth = new Auth();
    this.emailInput = new FormInputComponent("login", "email", "E-mail", "Write your email", false);
    this.passInput = new FormInputComponent(
      "login",
      "password",
      "Password",
      "Write your password",
      true
    );
  }

  init() {
    this.form.init();
    this.emailInput.init();
    this.passInput.init();
    this.auth.check();
  }
}
