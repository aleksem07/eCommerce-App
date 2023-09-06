import CartListItemComponent from "./cart-list-item";

describe("CartListItemComponent", () => {
  it("should instantiate", () => {
    const instance = new CartListItemComponent("test", "test");
    expect(instance).toBeInstanceOf(CartListItemComponent);
  });
});
