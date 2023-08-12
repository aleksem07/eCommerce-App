import FormInputComponent from "./form-input";

describe("FormInputComponent", () => {
  it("should instantiate", () => {
    const instance = new FormInputComponent("login", "email", "Email", "Invalid email");
    expect(instance).toBeInstanceOf(FormInputComponent);
  });
});
