import HeaderView from "./header.view";

export default class HeaderComponent {
  private view: HeaderView;

  constructor() {
    this.view = new HeaderView();
  }

  init() {
    this.view.render();
  }
}
