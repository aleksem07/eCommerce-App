import RsLinkView from "./rs-link.view";

export default class RsLinkComponent {
  private view: RsLinkView;

  constructor() {
    this.view = new RsLinkView();
  }

  init() {
    return this.view.render();
  }
}
