import UserPasswordComponent from "./user-password";

describe("UserPasswordComponent", () => {
  it("should instantiate", () => {
    const instance = new UserPasswordComponent({
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
    expect(instance).toBeInstanceOf(UserPasswordComponent);
  });

  it("should render password fields", () => {
    const instance = new UserPasswordComponent({
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

    const inputs = element.querySelectorAll("input[type='password']");
    expect(inputs).toHaveLength(3);
  });

  it("should disable fields when not in edit mode", () => {
    const instance = new UserPasswordComponent({
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
    expect(disabledInputs).toHaveLength(3);
  });

  it("should not disable fields when in edit mode", () => {
    const instance = new UserPasswordComponent({
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

    const editButton = element.querySelector<HTMLButtonElement>("button[type='button']");
    editButton?.click();

    const disabledInputs = element.querySelectorAll("input:disabled");
    expect(disabledInputs).toHaveLength(0);
  });
});
