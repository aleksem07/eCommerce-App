import FormControlComponent from "./form-control";

describe("Form Control", () => {
  it("should instantiate", () => {
    const instance = new FormControlComponent({
      formName: "testForm",
      inputName: "testInput",
      labelText: "testLabel",
      helpText: "testHelp",
      placeholderText: "testPlaceholder",
    });
    expect(instance).toBeInstanceOf(FormControlComponent);
  });
});
