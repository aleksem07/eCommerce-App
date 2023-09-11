import CartListComponent from "./cart-list";

describe("CartListComponent", () => {
  it("should instantiate", () => {
    const instance = new CartListComponent([], {
      value: 0,
      currencyCode: "USD",
    });
    expect(instance).toBeInstanceOf(CartListComponent);
  });

  it("should display line items", () => {
    const instance = new CartListComponent(
      [
        {
          name: "test",
          quantity: 1,
          images: ["test"],
          price: { value: 1, currencyCode: "USD" },
          discountedPrice: { value: 2, currencyCode: "USD" },
          totalPrice: {
            value: 3,
            currencyCode: "USD",
          },
          id: "test",
          productId: "test",
        },
      ],
      {
        value: 0,
        currencyCode: "USD",
      }
    );

    const element = instance.init();
    const lineItems = element.querySelectorAll(".cart-list-item");

    expect(lineItems).toHaveLength(1);
  });
});
