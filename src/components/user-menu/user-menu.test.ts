import UserMenuComponent from "./user-menu";

describe("UserMenuComponent", () => {
  it("should instantiate", () => {
    const instance = new UserMenuComponent("Full Name", "Email@Address.com");
    expect(instance).toBeInstanceOf(UserMenuComponent);
  });
});
