import RouterService from "./router";

describe("RouterService", () => {
  it("should instantiate", () => {
    const instance = new RouterService(this.container, {});
    expect(instance).toBeInstanceOf(RouterService);
  });
});
