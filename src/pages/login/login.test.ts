import LoginPage from "./login";

describe("LoginPage", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  it("should instantiate", () => {
    const instance = new LoginPage();
    expect(instance).toBeInstanceOf(LoginPage);
  });

  it("should render", () => {
    // Arrange
    const instance = new LoginPage();
    // Act
    instance.init();
    //Assert
    const loginPageElement = document.querySelector("#login-page");
    expect(loginPageElement).not.toBeNull();
    expect(loginPageElement?.textContent).toMatch(/LOGIN PAGE/);
  });
});
