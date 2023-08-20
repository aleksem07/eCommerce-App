import LoginFormComponent from "./login-form";

describe("LoginFormComponent", () => {
  let loginFormComponent: LoginFormComponent;

  beforeEach(() => {
    document.body.innerHTML = '<div id="login-page"></div>';
    loginFormComponent = new LoginFormComponent();
  });

  it("should render registration link", () => {
    // Arrange
    const instance = new LoginFormComponent();
    // Act
    instance.init();
    //Assert
    const registrationLinkElement = document.querySelector("#registration-link-wrapper");
    expect(registrationLinkElement).not.toBeNull();
  });

  describe("init", () => {
    it("should initialize the form components and services", () => {
      loginFormComponent.init();

      expect(loginFormComponent.validator).toBeDefined();
      expect(loginFormComponent.authService).toBeDefined();
      expect(loginFormComponent.tooltip).toBeDefined();
      expect(loginFormComponent.emailInput).toBeDefined();
      expect(loginFormComponent.passwordInput).toBeDefined();
      expect(loginFormComponent.passwordCheck).toBeDefined();
    });
  });
});
