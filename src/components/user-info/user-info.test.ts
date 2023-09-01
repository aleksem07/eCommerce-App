import UserInfoComponent from "./user-info";

describe("UserInfoComponent", () => {
  it("should instantiate", () => {
    const instance = new UserInfoComponent("data", {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "a@b.com",
      dateOfBirth: "2000-01-01",
    });
    expect(instance).toBeInstanceOf(UserInfoComponent);
  });
});
