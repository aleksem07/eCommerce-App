import FormControlComponent from "./form-control";

describe("FormControlComponent", () => {
  it("should instantiate", () => {
    const instance = new FormControlComponent({
      formName: "login",
      inputName: "password",
      labelText: "Password",
      helpText: "Invalid password",
    });
    expect(instance).toBeInstanceOf(FormControlComponent);
  });
});
