import AppView from "./app.view";

export default class AppComponent {
  private view: AppView;

  constructor() {
    this.view = new AppView();
  }

  init() {
    this.view.render();
  }
}
