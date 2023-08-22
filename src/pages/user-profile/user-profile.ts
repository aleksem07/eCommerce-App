import UserProfileView from "./user-profile.view";

export default class UserProfilePage {
  private view: UserProfileView;

  constructor() {
    this.view = new UserProfileView();
  }

  init() {
    this.view.render();
  }
}
