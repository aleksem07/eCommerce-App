import LoginFormComponent from "./login-form";

describe("LoginFormComponent", () => {
  let loginFormComponent: LoginFormComponent;

  beforeEach(() => {
    loginFormComponent = new LoginFormComponent();
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
