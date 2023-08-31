import UserAddressComponent from "./user-address";

describe("UserAddressComponent", () => {
  it("should instantiate", () => {
    const instance = new UserAddressComponent();
    expect(instance).toBeInstanceOf(UserAddressComponent);
  });
});
