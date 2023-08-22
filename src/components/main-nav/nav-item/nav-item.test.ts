import { Routes } from "@Services/router/router.types";
import NavItemComponent from "./nav-item";

describe("NavItemComponent", () => {
  it("should instantiate", () => {
    const instance = new NavItemComponent(Routes.LOGIN, "Login");
    expect(instance).toBeInstanceOf(NavItemComponent);
  });
});
