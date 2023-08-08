import LoginView from "./login.view";

export default class LoginPage {
  private view: LoginView;

  constructor() {
    this.view = new LoginView();
  }

  init() {
    this.view.render();
  }
}
