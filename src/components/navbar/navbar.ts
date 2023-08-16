import NavbarView from "./navbar.view";
import eventBus from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";

export default class NavbarComponent {
  private view: NavbarView;

  constructor() {
    this.view = new NavbarView();
    eventBus.subscribe(Events.userLogin, this.refreshAuthLinks.bind(this));
  }

  refreshAuthLinks() {
    this.view.refreshAuthLinks();
  }

  init() {
    this.view.render();
  }
}
