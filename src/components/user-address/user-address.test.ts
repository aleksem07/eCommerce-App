import UserAddressComponent from "./user-address";

describe("UserAddressComponent", () => {
  it("should instantiate", () => {
    const instance = new UserAddressComponent({
      header: "Shipping Address",
      address: {
        country: "US",
        city: "New York",
        streetName: "123 Main St",
        postalCode: "12345",
        isDefaultAddress: true,
        isBillingAddress: true,
        isShippingAddress: true,
        name: "John Doe",
      },
    });
    expect(instance).toBeInstanceOf(UserAddressComponent);
  });

  it("should render address fields", () => {
    const instance = new UserAddressComponent({
      header: "Shipping Address",
      address: {
        country: "US",
        city: "New York",
        streetName: "123 Main St",
        postalCode: "12345",
        isDefaultAddress: true,
        isBillingAddress: true,
        isShippingAddress: true,
        name: "John Doe",
      },
    });

    const element = instance.init();

    const inputs = element.querySelectorAll("input");
    expect(inputs).toHaveLength(5);
  });

  it("should disable fields when is not in edit mode", () => {
    const instance = new UserAddressComponent({
      header: "Shipping Address",
      address: {
        country: "US",
        city: "New York",
        streetName: "123 Main St",
        postalCode: "12345",
        isDefaultAddress: true,
        isBillingAddress: true,
        isShippingAddress: true,
        name: "John Doe",
      },
    });

    const element = instance.init();

    const disabledInputs = element.querySelectorAll("input:disabled");
    expect(disabledInputs).toHaveLength(5);
  });

  //TODO: Fix when address will be refactored
  it.skip("should not disable fields when is in edit mode", () => {
    const instance = new UserAddressComponent({
      header: "Shipping Address",
      address: {
        country: "US",
        city: "New York",
        streetName: "123 Main St",
        postalCode: "12345",
        isDefaultAddress: true,
        isBillingAddress: true,
        isShippingAddress: true,
        name: "John Doe",
      },
    });
    const element = instance.init();

    const editButton = element.querySelector<HTMLButtonElement>("button[type='button']");
    editButton?.click();

    const disabledInputs = element.querySelectorAll("input:disabled");
    expect(disabledInputs).toHaveLength(0);
  });
});
