import LoginFormView from "./login-form.view";

export default class LoginFormComponent {
  private view: LoginFormView;

  constructor() {
    this.view = new LoginFormView();
  }

  init() {
    this.view.render();
  }
}
