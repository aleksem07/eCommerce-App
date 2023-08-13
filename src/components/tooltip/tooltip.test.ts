import NotificationHandlerUtil from "./tooltip";

describe("ErrorHandlingUtil", () => {
  it("should instantiate", () => {
    const instance = new NotificationHandlerUtil();
    expect(instance).toBeInstanceOf(NotificationHandlerUtil);
  });
});
