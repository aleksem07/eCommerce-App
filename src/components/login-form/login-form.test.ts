import LoginFormComponent from "./login-form";

describe("LoginFormComponent", () => {
  it("should instantiate", () => {
    const instance = new LoginFormComponent();
    expect(instance).toBeInstanceOf(LoginFormComponent);
  });
});