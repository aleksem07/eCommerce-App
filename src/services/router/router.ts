import eventBusService from "@Services/event-bus/event-bus";
import { Route, Routes } from "./router.types";
import { Events } from "@Services/event-bus/event-bus.types";

export default class RouterService {
  private static instance: RouterService;
  private routes: Record<string, Route>;
  private container: HTMLDivElement;

  constructor(container: HTMLDivElement, routes: Record<string, Route>) {
    this.container = container;
    this.routes = routes;

    this.handleRouteInitial();

    this.handleRouteChange();

    window.addEventListener("hashchange", this.handleRouteChange.bind(this));
  }

  private handleRouteInitial() {
    const { hash } = window.location;
    const initialRoute = hash || Routes.MAIN;
    RouterService.navigateTo(initialRoute);
  }

  static getInstance(container: HTMLDivElement, routes: Record<string, Route>): RouterService {
    if (!RouterService.instance) {
      RouterService.instance = new RouterService(container, routes);
    }

    return RouterService.instance;
  }

  private handleRouteChange() {
    const { hash, pathname } = window.location;
    const [cleanHash] = hash.split("-");
    const isRootPath = pathname === "/";
    const route = this.routes[cleanHash];
    this.container.innerHTML = "";

    if (route && isRootPath) {
      route.init();
    } else {
      this.routes[Routes.NOT_FOUND].init();
    }

    eventBusService.publish(Events.urlChanged);
  }

  static navigateTo(path: string) {
    window.location.hash = path;
  }
}
