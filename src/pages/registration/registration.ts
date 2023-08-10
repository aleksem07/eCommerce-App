import { Route } from "@Services/router/router.types";
import RegistrationView from "./registration.view";

export default class RegistrationPage implements Route {
  private view: RegistrationView;

  constructor() {
    this.view = new RegistrationView();
  }

  init() {
    this.view.render();
  }
}
