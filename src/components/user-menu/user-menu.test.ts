import UserMenuComponent from "./user-menu";

describe("UserMenuComponent", () => {
  it("should instantiate", () => {
    const instance = new UserMenuComponent();
    expect(instance).toBeInstanceOf(UserMenuComponent);
  });
});
