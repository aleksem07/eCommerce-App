import NotificationHandlerUtil from "./notification-handler";

describe("ErrorHandlingUtil", () => {
  it("should instantiate", () => {
    const instance = new NotificationHandlerUtil();
    expect(instance).toBeInstanceOf(NotificationHandlerUtil);
  });

  it("should show success message popover", () => {
    const instance = new NotificationHandlerUtil();
    instance.handleSuccess("Success!");
    const popoverElement = document.querySelector(".popover") as HTMLElement;
    expect(popoverElement).toBeTruthy();
    expect(popoverElement.textContent).toContain("Success!");
  });
});
