import MainView from "./main.view";

export default class MainPage {
  private view: MainView;

  constructor() {
    this.view = new MainView();
  }

  init() {
    this.view.render();
  }
}
