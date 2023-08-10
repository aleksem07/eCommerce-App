import { Route } from "./router.types";

export default class RouterService {
  private routes: Record<string, Route>;
  private container: HTMLDivElement;

  constructor(container: HTMLDivElement, routes: Record<string, Route>) {
    this.container = container;
    this.routes = routes;

    this.handleRouteChange();

    window.addEventListener("hashchange", this.handleRouteChange.bind(this));
  }

  private handleRouteChange() {
    const hash = window.location.hash;
    const path = hash.slice(1);
    const route = this.routes[path];
    this.container.innerHTML = "";

    if (route) {
      route.init();
    } else {
      this.routes["404"].init();
    }
  }

  navigateTo(path: string) {
    window.location.hash = `#${path}`;
  }
}
