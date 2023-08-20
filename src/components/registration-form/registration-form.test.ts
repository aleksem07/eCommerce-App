import RegistrationFormComponent from "./registration-form";

describe("RegistrationFormComponent", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="registration-page"></div>';
  });

  it("should instantiate", () => {
    const instance = new RegistrationFormComponent();
    expect(instance).toBeInstanceOf(RegistrationFormComponent);
  });

  it("should render login link", () => {
    // Arrange
    const instance = new RegistrationFormComponent();
    // Act
    instance.init();
    //Assert
    const loginPageElement = document.querySelector("#login-link-wrapper");
    expect(loginPageElement).not.toBeNull();
  });
});
