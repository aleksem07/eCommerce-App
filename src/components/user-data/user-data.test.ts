import UserDataComponent from "./user-data";

describe("UserDataComponent", () => {
  it("should instantiate", () => {
    const instance = new UserDataComponent({
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "a@b.com",
      dateOfBirth: "2000-01-01",
      shippingAddress: {
        country: "US",
        city: "New York",
        streetName: "123 Main St",
        postalCode: "12345",
        isDefaultAddress: true,
      },
    });
    expect(instance).toBeInstanceOf(UserDataComponent);
  });
});
