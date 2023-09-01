import UserPasswordComponent from "./user-password";

describe("UserPasswordComponent", () => {
  it("should instantiate", () => {
    const instance = new UserPasswordComponent("user", true);
    expect(instance).toBeInstanceOf(UserPasswordComponent);
  });
});
