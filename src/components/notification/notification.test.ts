import NotificationComponent from "./notification";

describe("NotificationComponent", () => {
  it("should instantiate", () => {
    const instance = new NotificationComponent();
    expect(instance).toBeInstanceOf(NotificationComponent);
  });
});