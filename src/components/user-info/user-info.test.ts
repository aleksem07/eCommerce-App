import UserInfoComponent from "./user-info";

describe("UserInfoComponent", () => {
  it("should instantiate", () => {
    const instance = new UserInfoComponent({
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
    expect(instance).toBeInstanceOf(UserInfoComponent);
  });

  it("should render address fields", () => {
    const instance = new UserInfoComponent({
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

    const inputs = element.querySelectorAll("input");
    expect(inputs).toHaveLength(4);
  });

  it("should disable fields when is not in edit mode", () => {
    const instance = new UserInfoComponent({
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

    const disabledInputs = element.querySelectorAll("input:disabled");
    expect(disabledInputs).toHaveLength(4);
  });

  it("should not disable fields when is in edit mode", () => {
    const instance = new UserInfoComponent({
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

    const disabledInputs = element.querySelectorAll("input:disabled");
    expect(disabledInputs).toHaveLength(0);
  });
});
