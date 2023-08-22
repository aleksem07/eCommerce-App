import CatalogView from "./catalog.view";

export default class CatalogPage {
  private view: CatalogView;

  constructor() {
    this.view = new CatalogView();
  }

  init() {
    this.view.render();
  }
}
