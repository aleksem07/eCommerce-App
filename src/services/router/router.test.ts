import RouterService from "./router";

class MockRoute {
  init() {}
}

describe("RouterService", () => {
  let mockContainer: HTMLDivElement;
  let mockRoutes: Record<string, MockRoute>;

  beforeEach(() => {
    mockContainer = document.createElement("div");
    mockRoutes = {
      "/mock": new MockRoute(),
    };
  });

  it("should instantiate", () => {
    const instance = new RouterService(mockContainer, mockRoutes);
    expect(instance).toBeInstanceOf(RouterService);
  });
});
