import MainNavComponent from "./main-nav";

describe("MainNavComponent", () => {
  it("should instantiate", () => {
    const instance = new MainNavComponent();
    expect(instance).toBeInstanceOf(MainNavComponent);
  });
});
