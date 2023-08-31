import UserDataComponent from "./user-data";

describe("UserDataComponent", () => {
  it("should instantiate", () => {
    const instance = new UserDataComponent();
    expect(instance).toBeInstanceOf(UserDataComponent);
  });
});
