import LoginFormComponent from "./login-form";

describe("LoginFormComponent", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="login-page"></div>';
  });

  it("should instantiate", () => {
    const instance = new LoginFormComponent();
    expect(instance).toBeInstanceOf(LoginFormComponent);
  });

  it("should render", () => {
    // Arrange
    const instance = new LoginFormComponent();
    // Act
    instance.init();
    //Assert
    const loginFormElement = document.querySelector("#login-form");
    expect(loginFormElement).not.toBeNull();
    expect(loginFormElement?.textContent).toMatch(/LOGIN FORM/);
  });
});
