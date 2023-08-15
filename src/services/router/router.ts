import { Route, Routes } from "./router.types";

export default class RouterService {
  private static instance: RouterService;
  private routes: Record<string, Route>;
  private container: HTMLDivElement;

  constructor(container: HTMLDivElement, routes: Record<string, Route>) {
    this.container = container;
    this.routes = routes;

    this.handleRouteChange();

    window.addEventListener("hashchange", this.handleRouteChange.bind(this));
  }

  static getInstance(container: HTMLDivElement, routes: Record<string, Route>): RouterService {
    if (!RouterService.instance) {
      RouterService.instance = new RouterService(container, routes);
    }

    return RouterService.instance;
  }

  private handleRouteChange() {
    const { hash, pathname } = window.location;
    const isRootPath = pathname === "/";
    const route = this.routes[hash];
    this.container.innerHTML = "";

    if (route && isRootPath) {
      route.init();
    } else {
      this.routes[Routes.NOT_FOUND].init();
    }
  }

  navigateTo(path: string) {
    window.location.hash = path;
  }
}
