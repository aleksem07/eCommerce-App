import UserInfoComponent from "./user-info";

describe("UserInfoComponent", () => {
  it("should instantiate", () => {
    const instance = new UserInfoComponent("data");
    expect(instance).toBeInstanceOf(UserInfoComponent);
  });
});
