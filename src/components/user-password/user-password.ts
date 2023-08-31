import UserPasswordView from "./user-password.view";

export default class UserPasswordComponent {
  private view: UserPasswordView;

  constructor() {
    this.view = new UserPasswordView();
  }

  init() {
    return this.view.render();
  }
}
