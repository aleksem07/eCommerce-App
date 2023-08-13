import NavbarComponent from "./navbar";

describe("NavbarComponent", () => {
  it("should instantiate", () => {
    const instance = new NavbarComponent();
    expect(instance).toBeInstanceOf(NavbarComponent);
  });
});