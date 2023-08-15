import FormControlComponent from "./form-control";

describe("Form Control", () => {
  it("should instantiate", () => {
    const instance = new FormControlComponent({
      formName: "testForm",
      inputName: "testInput",
      labelText: "testLabel",
      helpText: "testHelp",
    });
    expect(instance).toBeInstanceOf(FormControlComponent);
  });
});
