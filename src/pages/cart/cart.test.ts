import CartPage from "./cart";

describe("CartPage", () => {
  it("should instantiate", () => {
    const instance = new CartPage();
    expect(instance).toBeInstanceOf(CartPage);
  });
});
