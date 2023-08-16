import { Route } from "@Services/router/router.types";
import RegistrationView from "./registration.view";
import RegistrationFormComponent from "@Components/registration-form/registration-form";

export default class RegistrationPage implements Route {
  private view: RegistrationView;
  registrationForm: RegistrationFormComponent;

  constructor() {
    this.view = new RegistrationView();
    this.registrationForm = new RegistrationFormComponent();
  }

  init() {
    this.view.render();
    this.registrationForm.init();
  }
}
