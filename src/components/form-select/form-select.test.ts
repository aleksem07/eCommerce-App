import FormSelectComponent from "./form-select";

describe("FormSelectComponent", () => {
  it("should instantiate", () => {
    const instance = new FormSelectComponent({
      formName: "form",
      inputName: "input",
      labelText: "Label",
      helpText: "Help",
      options: [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
      ],
    });
    expect(instance).toBeInstanceOf(FormSelectComponent);
  });
});
