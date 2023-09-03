import UserMenuComponent from "./user-menu";

describe("UserMenuComponent", () => {
  it("should instantiate", () => {
    const instance = new UserMenuComponent("Full Name", "Email@Address.com");
    expect(instance).toBeInstanceOf(UserMenuComponent);
  });

  it.each([
    { text: "Full Name" },
    { text: "Email@Address.com" },
    { text: "My profile" },
    { text: "Sign out" },
  ])("should render $text", ({ text }) => {
    const instance = new UserMenuComponent("Full Name", "Email@Address.com");

    const list = instance.init();

    const allElements = Array.from(list.querySelectorAll("*"));
    const element = allElements?.find((item) => item.textContent === text);
    expect(element).toBeTruthy();
  });
});
