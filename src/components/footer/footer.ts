import FooterView from "./footer.view";

export default class FooterComponent {
  private view: FooterView;

  constructor() {
    this.view = new FooterView();
  }

  init() {
    return this.view.render();
  }
}
