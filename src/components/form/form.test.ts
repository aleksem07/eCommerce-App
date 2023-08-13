import FormComponent from "./form";

describe("FormComponent", () => {
  it("should instantiate", () => {
    const instance = new FormComponent("login");
    expect(instance).toBeInstanceOf(FormComponent);
  });
});
