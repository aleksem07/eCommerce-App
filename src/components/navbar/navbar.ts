import NavbarView from "./navbar.view";

export default class NavbarComponent {
  private view: NavbarView;

  constructor() {
    this.view = new NavbarView();
  }

  init() {
    this.view.render();
  }
}
