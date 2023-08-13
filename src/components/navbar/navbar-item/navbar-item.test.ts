import NavbarItemComponent from "./navbar-item";

describe("NavbarItemComponent", () => {
  it("should instantiate", () => {
    const instance = new NavbarItemComponent();
    expect(instance).toBeInstanceOf(NavbarItemComponent);
  });
});
