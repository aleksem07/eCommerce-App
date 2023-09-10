import NavbarItemView from "./navbar-item.view";

export default class NavbarItemComponent {
  private view: NavbarItemView;

  constructor(href: string, text: string, icon?: string) {
    this.view = new NavbarItemView(href, text, icon);
  }

  init() {
    return this.view.render();
  }
}
