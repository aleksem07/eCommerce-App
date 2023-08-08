import LoginFormComponent from "@Components/login-form/login-form";
import LoginView from "./login.view";

export default class LoginPage {
  private view: LoginView;
  private loginForm: LoginFormComponent;

  constructor() {
    this.view = new LoginView();
    this.loginForm = new LoginFormComponent();
  }

  init() {
    this.view.render();
    this.loginForm.init();
  }
}
