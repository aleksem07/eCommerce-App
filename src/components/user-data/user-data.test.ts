import UserDataComponent from "./user-data";

describe("UserDataComponent", () => {
  it("should instantiate", () => {
    const instance = new UserDataComponent({
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "a@b.com",
      dateOfBirth: "2000-01-01",
    });
    expect(instance).toBeInstanceOf(UserDataComponent);
  });
});
