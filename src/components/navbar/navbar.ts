import NavbarView from "./navbar.view";

export default class NavbarComponent {
  private view: NavbarView;

  constructor() {
    this.view = new NavbarView();
  }

  refreshAuthLinks() {
    this.view.refreshAuthLinks();
  }

  init() {
    this.view.render();
  }
}
