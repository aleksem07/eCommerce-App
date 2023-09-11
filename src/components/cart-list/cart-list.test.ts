import CartListComponent from "./cart-list";

describe("CartListComponent", () => {
  it("should instantiate", () => {
    const instance = new CartListComponent([]);
    expect(instance).toBeInstanceOf(CartListComponent);
  });
});
