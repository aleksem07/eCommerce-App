import TooltipComponent from "./tooltip";

describe("TooltipComponent", () => {
  it("should instantiate", () => {
    const instance = new TooltipComponent();
    expect(instance).toBeInstanceOf(TooltipComponent);
  });
  it("should show tooltip", () => {
    const instance = new TooltipComponent();
    const title = "Test Title";
    const content = "Test Content";
    const dummyElement = document.createElement("div");

    instance.init(dummyElement);
    const showPopSpy = jest.spyOn(instance, "showPop");

    instance.show(title, content);

    expect(showPopSpy).toHaveBeenCalledWith(title, content);
  });
});
