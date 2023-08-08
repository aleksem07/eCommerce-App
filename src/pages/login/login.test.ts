import LoginPage from "./login";

describe("LoginPage", () => {
  it("should instantiate", () => {
    const instance = new LoginPage();
    expect(instance).toBeInstanceOf(LoginPage);
  });
});