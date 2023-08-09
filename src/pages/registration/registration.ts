import RegistrationView from "./registration.view";

export default class RegistrationPage {
  private view: RegistrationView;

  constructor() {
    this.view = new RegistrationView();
  }

  init() {
    this.view.render();
  }
}
