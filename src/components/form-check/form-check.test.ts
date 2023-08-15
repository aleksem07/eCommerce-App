import FormCheckComponent from "./form-check";

describe("FormCheckComponent", () => {
  it("should instantiate", () => {
    const instance = new FormCheckComponent({ formName: "login", inputName: "password" });
    expect(instance).toBeInstanceOf(FormCheckComponent);
  });
});
