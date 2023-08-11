import { Route } from "@Services/router/router.types";
import NotFoundView from "./not-found.view";

export default class NotFoundPage implements Route {
  private view: NotFoundView;

  constructor() {
    this.view = new NotFoundView();
  }

  init() {
    this.view.render();
  }
}
