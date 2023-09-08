import CartService from "./cart";

describe("CartService", () => {
  it("should instantiate", () => {
    const instance = new CartService();
    expect(instance).toBeInstanceOf(CartService);
  });
});
