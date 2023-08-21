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
    const instance = new RegistrationFormComponent();

    instance.init();

    const loginLinkElement = document.querySelector("#login-link-wrapper");
    expect(loginLinkElement).not.toBeNull();
  });
});
