import UserAddressComponent from "./user-address";

describe("UserAddressComponent", () => {
  it("should instantiate", () => {
    const instance = new UserAddressComponent({
      header: "Shipping Address",
      formName: "user-data",
      address: {
        country: "US",
        city: "New York",
        streetName: "123 Main St",
        postalCode: "12345",
        isDefaultAddress: true,
      },
      isEditMode: false,
    });
    expect(instance).toBeInstanceOf(UserAddressComponent);
  });
});
