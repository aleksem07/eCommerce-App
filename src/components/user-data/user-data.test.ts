import UserDataComponent from "./user-data";

describe("UserDataComponent", () => {
  it("should instantiate", () => {
    const instance = new UserDataComponent({
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "a@b.com",
      dateOfBirth: "2000-01-01",
      version: 1,
      addresses: [
        {
          city: "New York",
          country: "US",
          postalCode: "12345",
          streetName: "123 Main St",
          isDefaultAddress: true,
          isBillingAddress: false,
          isShippingAddress: false,
          name: "John Doe",
        },
      ],
    });
    expect(instance).toBeInstanceOf(UserDataComponent);
  });
});
