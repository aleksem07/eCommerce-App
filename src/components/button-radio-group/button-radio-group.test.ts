import ButtonRadioGroupComponent from "./button-radio-group";

describe("ButtonRadioGroupComponent", () => {
  it("should instantiate", () => {
    const instance = new ButtonRadioGroupComponent(
      [
        {
          button: "Button 1",
          checked: true,
        },
        {
          button: "Button 2",
          checked: false,
        },
      ],
      "button-radio-group",
      false
    );
    expect(instance).toBeInstanceOf(ButtonRadioGroupComponent);
  });
});
