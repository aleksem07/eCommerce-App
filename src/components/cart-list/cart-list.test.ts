import CartListComponent from "./cart-list";

describe("CartListComponent", () => {
  it("should instantiate", () => {
    const instance = new CartListComponent([], {
      value: 0,
      currencyCode: "USD",
    });
    expect(instance).toBeInstanceOf(CartListComponent);
  });
});
