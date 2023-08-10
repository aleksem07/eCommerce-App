import RouterService from "./router";
import { Routes } from "./router.types";

class MockRoute {
  init() {
    return;
  }
}

describe("RouterService", () => {
  let mockContainer: HTMLDivElement;
  let mockRoutes: Record<string, MockRoute>;

  beforeEach(() => {
    mockContainer = document.createElement("div");
    mockRoutes = {
      "#mock": new MockRoute(),
      [Routes.NOT_FOUND]: new MockRoute(),
    };
  });

  it("should instantiate", () => {
    const instance = new RouterService(mockContainer, mockRoutes);
    expect(instance).toBeInstanceOf(RouterService);
  });
});
