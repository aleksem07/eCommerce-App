import { Route } from "@Services/router/router.types";
import RegistrationView from "./registration.view";
import LoginFormComponent from "@Components/login-form/login-form";

export default class RegistrationPage implements Route {
  private view: RegistrationView;
  registrationForm: LoginFormComponent;

  constructor() {
    this.view = new RegistrationView();
    this.registrationForm = new LoginFormComponent();
  }

  init() {
    this.view.render();
    this.registrationForm.init();
  }
}
