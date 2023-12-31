import RouterService from "./router";
import { Route, Routes } from "./router.types";

class MockRoute implements Route {
  init() {
    return;
  }
}

class NotFoundRoute implements Route {
  init() {
    return;
  }
}

describe("RouterService", () => {
  let mockContainer: HTMLDivElement;
  let mockRoutes: Record<string, Route>;

  beforeEach(() => {
    mockContainer = document.createElement("div");
    mockRoutes = {
      "#mock": new MockRoute(),
      [Routes.NOT_FOUND]: new NotFoundRoute(),
    };
  });

  it("should instantiate", () => {
    const instance = new RouterService(mockContainer, mockRoutes);
    expect(instance).toBeInstanceOf(RouterService);
  });

  it("should redirect to existing route", () => {
    window.location.pathname = "/";
    window.location.hash = "#mock";
    const existingRouterInitSpy = jest.spyOn(MockRoute.prototype, "init");

    new RouterService(mockContainer, mockRoutes);

    expect(existingRouterInitSpy).toHaveBeenCalled();
  });

  it("should redirect to Not Found route", () => {
    window.location.pathname = "/";
    window.location.hash = "#non-existing-page";
    const notFoundRouteInitSpy = jest.spyOn(NotFoundRoute.prototype, "init");

    new RouterService(mockContainer, mockRoutes);

    expect(notFoundRouteInitSpy).toHaveBeenCalled();
  });

  it("should redirect to Not Found route when pathname and hash do not exist", () => {
    window.location.pathname = "/non-existing-page";
    window.location.hash = "#non-existing-page";
    const notFoundRouteInitSpy = jest.spyOn(NotFoundRoute.prototype, "init");

    new RouterService(mockContainer, mockRoutes);

    expect(notFoundRouteInitSpy).toHaveBeenCalled();
  });

  it("should redirect to Not Found route when pathname does not exist", () => {
    window.location.pathname = "/non-existing-page";
    window.location.hash = "#mock";
    const notFoundRouteInitSpy = jest.spyOn(NotFoundRoute.prototype, "init");

    new RouterService(mockContainer, mockRoutes);

    expect(notFoundRouteInitSpy).toHaveBeenCalled();
  });

  it("should redirect to correct page when query params exist", () => {
    window.location.pathname = "/";
    window.location.hash = "#mock?param1=value1&param2=value2";
    const mockInitSpy = jest.spyOn(MockRoute.prototype, "init");

    new RouterService(mockContainer, mockRoutes);

    expect(mockInitSpy).toHaveBeenCalled();
  });

  it("should redirect to correct page when url has item id", () => {
    window.location.pathname = "/";
    window.location.hash = "#mock-123-456-789";
    const mockInitSpy = jest.spyOn(MockRoute.prototype, "init");

    new RouterService(mockContainer, mockRoutes);

    expect(mockInitSpy).toHaveBeenCalled();
  });
});
