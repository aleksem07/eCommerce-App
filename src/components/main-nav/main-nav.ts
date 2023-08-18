import MainNavView from "./main-nav.view";

export default class MainNavComponent {
  private view: MainNavView;

  constructor() {
    this.view = new MainNavView();
  }

  init() {
    return this.view.render();
  }
}
