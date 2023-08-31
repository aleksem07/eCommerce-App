import NavbarItemView from "./navbar-item.view";

export default class NavbarItemComponent {
  private view: NavbarItemView;

  constructor(href: string, text: string) {
    this.view = new NavbarItemView(href, text);
  }

  set text(text: string) {
    this.view.text = text;
  }

  init() {
    return this.view.render();
  }
}
