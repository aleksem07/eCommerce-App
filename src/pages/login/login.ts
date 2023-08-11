import LoginFormComponent from "@Components/login-form/login-form";
import LoginView from "./login.view";
import { Route } from "@Services/router/router.types";

export default class LoginPage implements Route {
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
