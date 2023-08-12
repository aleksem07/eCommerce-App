import NotificationHandlerUtil from "./tooltip";

describe("ErrorHandlingUtil", () => {
  it("should instantiate", () => {
    const instance = new NotificationHandlerUtil();
    expect(instance).toBeInstanceOf(NotificationHandlerUtil);
  });

  it("should show success message popover", () => {
    const instance = new NotificationHandlerUtil();
    const container = document.querySelector("body") as HTMLElement;
    instance.handleSuccess(container, "Success!");
    const popoverElement = document.querySelector(".popover") as HTMLElement;
    expect(popoverElement).toBeTruthy();
    expect(popoverElement.textContent).toContain("Success!");
  });
});
