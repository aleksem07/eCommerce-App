import RegistrationFormComponent from "./registration-form";

describe("RegistrationFormComponent", () => {
  it("should instantiate", () => {
    const instance = new RegistrationFormComponent();
    expect(instance).toBeInstanceOf(RegistrationFormComponent);
  });
});
