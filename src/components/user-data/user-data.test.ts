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

  it("should not render billing address when it is not provided", () => {
    const instance = new UserDataComponent({
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "a@b.com",
      dateOfBirth: "2000-01-01",
      version: 1,
      shippingAddress: {
        country: "US",
        city: "New York",
        streetName: "123 Main St",
        postalCode: "12345",
        isDefaultAddress: true,
      },
    });

    const element = instance.init();

    const billingAddressInputs = element.querySelectorAll("input[id^=user-data-billing-address]");
    expect(billingAddressInputs).toHaveLength(0);
  });

  it("should render billing address when it is provided", () => {
    const instance = new UserDataComponent({
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "a@b.com",
      dateOfBirth: "2000-01-01",
      version: 1,
      shippingAddress: {
        country: "US",
        city: "New York",
        streetName: "123 Main St",
        postalCode: "12345",
        isDefaultAddress: true,
      },
      billingAddress: {
        country: "US",
        city: "Miami",
        streetName: "1234 Main St",
        postalCode: "12346",
        isDefaultAddress: true,
      },
    });

    const element = instance.init();

    const billingAddressInputs = element.querySelectorAll("input[id^=user-data-billing-address]");
    expect(billingAddressInputs).toHaveLength(4);
  });
});
