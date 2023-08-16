import RegistrationFormView from "./registration-form.view";

export default class RegistrationFormComponent {
  private view: RegistrationFormView;

  constructor() {
    this.view = new RegistrationFormView();
  }

  init() {
    this.view.render();
  }
}
