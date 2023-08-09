import { Controller } from "@Interfaces/controller";
import eventBus from "@Services/event/event";
import { EventTypes } from "./router.types";

export default class RouterService {
  private routes: Record<string, Controller>;
  private currentPath: string;
  private container: HTMLDivElement;

  constructor(container: HTMLDivElement, routes: Record<string, Controller>) {
    this.container = container;
    this.routes = routes;
    this.currentPath = "";
    // Инициализируйте с первоначальной загрузкой
    this.handleRouteChange();

    // Обработка прямых переходов и навигации назад/вперед
    window.addEventListener("popstate", this.handleRouteChange.bind(this));
  }

  private handleRouteChange() {
    const path = window.location.pathname;

    this.container.innerHTML = "";
    const route = this.routes[path];

    if (route) {
      this.currentPath = path;
      route.init();
      eventBus.publish(EventTypes.urlChanged, path);
    } else {
      global.console.error(`Path '${path}' is not registered in router`);
    }
  }

  navigateTo(path: string) {
    window.history.pushState(null, "", path);
    this.handleRouteChange();
  }
}
