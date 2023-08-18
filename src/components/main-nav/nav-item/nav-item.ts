import NavItemView from "./nav-item.view";

export default class NavItemComponent {
  private view: NavItemView;

  constructor(href: string, text: string) {
    this.view = new NavItemView(href, text);
  }

  init() {
    return this.view.render();
  }
}
