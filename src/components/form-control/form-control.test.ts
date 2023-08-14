import FormControlComponent from "./form-control";

describe("FormControlComponent", () => {
  it("should instantiate", () => {
    const instance = new FormControlComponent("login", "email", "Email", "Invalid email");
    expect(instance).toBeInstanceOf(FormControlComponent);
  });
});
