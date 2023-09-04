import UserPasswordComponent from "./user-password";

describe("UserPasswordComponent", () => {
  it("should instantiate", () => {
    const instance = new UserPasswordComponent("user");
    expect(instance).toBeInstanceOf(UserPasswordComponent);
  });

  it("should render password fields", () => {
    const instance = new UserPasswordComponent("user");

    const element = instance.init();

    const inputs = element.querySelectorAll("input[type='password']");
    expect(inputs).toHaveLength(2);
  });

  it("should disable fields when not in edit mode", () => {
    const instance = new UserPasswordComponent("user");

    const element = instance.init();

    const disabledInputs = element.querySelectorAll("input:disabled");
    expect(disabledInputs).toHaveLength(2);
  });

  it("should not disable fields when in edit mode", () => {
    const instance = new UserPasswordComponent("user");

    const element = instance.init();

    const disabledInputs = element.querySelectorAll("input:disabled");
    expect(disabledInputs).toHaveLength(0);
  });
});
