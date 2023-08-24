import NotificationComponent from "./notification";

describe("NotificationComponent", () => {
  it("should instantiate", () => {
    const instance = new NotificationComponent();
    expect(instance).toBeInstanceOf(NotificationComponent);
  });

  it("should has class text-bg-danger when variant is error", () => {
    const instance = new NotificationComponent();

    instance.init("danger", "error message");

    const element = document.querySelector(".toast");
    expect(element?.classList).toContain("text-bg-danger");
  });
});
