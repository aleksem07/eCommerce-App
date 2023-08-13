import { Routes } from "@Services/router/router.types";
import NavbarItemComponent from "./navbar-item";

describe("NavbarItemComponent", () => {
  it("should instantiate", () => {
    const instance = new NavbarItemComponent(Routes.LOGIN, "Login");
    expect(instance).toBeInstanceOf(NavbarItemComponent);
  });
});
