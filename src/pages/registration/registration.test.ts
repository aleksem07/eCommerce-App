import RegistrationPage from "./registration";

describe("RegistrationPage", () => {
  it("should instantiate", () => {
    const instance = new RegistrationPage();
    expect(instance).toBeInstanceOf(RegistrationPage);
  });
});
