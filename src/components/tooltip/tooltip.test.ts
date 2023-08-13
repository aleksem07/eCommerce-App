import Tooltip from "./tooltip";

describe("ErrorHandlingUtil", () => {
  it("should instantiate", () => {
    const instance = new Tooltip();
    expect(instance).toBeInstanceOf(Tooltip);
  });

  it("should call showPopover method on success", () => {
    const instance = new Tooltip();
    const element = document.createElement("div");
    const successMessage = "Success message";
    const result = { success: true };
    instance.showPopover = jest.fn();
    instance.init(element, result, successMessage);
    expect(instance.showPopover).toHaveBeenCalledWith(element, "Success", successMessage, 1500);
  });

  it("should call showPopover method on error", () => {
    const instance = new Tooltip();
    const element = document.createElement("div");
    const errorMessage = "Error message";
    const result = { success: false, error: errorMessage };
    instance.showPopover = jest.fn();
    instance.init(element, result, "");
    expect(instance.showPopover).toHaveBeenCalledWith(element, "Error", errorMessage, 3500);
  });
});
