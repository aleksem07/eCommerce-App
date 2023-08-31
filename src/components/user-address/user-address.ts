import UserAddressView from "./user-address.view";

export default class UserAddressComponent {
  private view: UserAddressView;

  constructor() {
    this.view = new UserAddressView();
  }

  init() {
    return this.view.render();
  }
}
