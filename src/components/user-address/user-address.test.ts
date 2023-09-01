import UserAddressComponent from "./user-address";

describe("UserAddressComponent", () => {
  it("should instantiate", () => {
    const instance = new UserAddressComponent("test", "test", {
      country: "US",
      city: "New York",
      streetName: "123 Main St",
      postalCode: "12345",
    });
    expect(instance).toBeInstanceOf(UserAddressComponent);
  });
});
