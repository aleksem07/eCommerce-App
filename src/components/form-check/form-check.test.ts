import FormCheckComponent from "./form-check";

describe("FormCheckComponent", () => {
  it("should instantiate", () => {
    const instance = new FormCheckComponent("login", "password");
    expect(instance).toBeInstanceOf(FormCheckComponent);
  });
});
