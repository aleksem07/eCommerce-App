import LoginFormView from "./login-form.view";
import FormControlComponent from "@Components/form-control/form-control";
import FormCheckComponent from "@Components/form-check/form-check";

export default class LoginFormComponent {
  emailInput: FormControlComponent;
  passwordInput: FormControlComponent;
  passwordCheck: FormCheckComponent;
  private view: LoginFormView;

  constructor() {
    this.view = new LoginFormView();
    this.emailInput = new FormControlComponent("login", "email", "Email", "Invalid email");
    this.passwordInput = new FormControlComponent(
      "login",
      "password",
      "Password",
      "Invalid password"
    );
    this.passwordCheck = new FormCheckComponent("login", "password");
  }

  init() {
    this.view.render();
    this.emailInput.init();
    this.passwordInput.init();
    this.passwordCheck.init();
  }
}
