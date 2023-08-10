import { Route } from "@Services/router/router.types";
import MainView from "./main.view";

export default class MainPage implements Route {
  private view: MainView;

  constructor() {
    this.view = new MainView();
  }

  init() {
    this.view.render();
  }
}
