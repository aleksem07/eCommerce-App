import UserAddressComponent from "./user-address";

describe("UserAddressComponent", () => {
  it("should instantiate", () => {
    const instance = new UserAddressComponent("test");
    expect(instance).toBeInstanceOf(UserAddressComponent);
  });
});
