import NotFoundView from "./not-found.view";

export default class NotFoundPage {
  private view: NotFoundView;

  constructor() {
    this.view = new NotFoundView();
  }

  init() {
    this.view.render();
  }
}
