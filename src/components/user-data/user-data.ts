import UserDataView from "./user-data.view";

export default class UserDataComponent {
  private view: UserDataView;

  constructor() {
    this.view = new UserDataView();
  }

  init() {
    return this.view.render();
  }
}
