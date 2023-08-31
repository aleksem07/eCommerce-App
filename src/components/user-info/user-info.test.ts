import UserInfoComponent from "./user-info";

describe("UserInfoComponent", () => {
  it("should instantiate", () => {
    const instance = new UserInfoComponent();
    expect(instance).toBeInstanceOf(UserInfoComponent);
  });
});
