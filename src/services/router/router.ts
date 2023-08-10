import { Route } from "./router.types";

export default class RouterService {
  private routes: Record<string, Route>;
  private container: HTMLDivElement;

  constructor(container: HTMLDivElement, routes: Record<string, Route>) {
    this.container = container;
    this.routes = routes;

    this.handleRouteChange();

    window.addEventListener("popstate", this.handleRouteChange.bind(this));
  }

  private handleRouteChange() {
    const path = window.location.pathname;
    const route = this.routes[path];
    this.container.innerHTML = "";

    if (route) {
      route.init();
    } else {
      this.routes["/404"].init();
    }
  }

  navigateTo(path: string) {
    window.history.pushState(null, "", path);
    this.handleRouteChange();
  }
}
