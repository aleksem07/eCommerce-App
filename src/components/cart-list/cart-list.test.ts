import CartListComponent from "./cart-list";

describe("CartListComponent", () => {
  it("should instantiate", () => {
    const instance = new CartListComponent("test", "test");
    expect(instance).toBeInstanceOf(CartListComponent);
  });
});
