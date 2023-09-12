import { Cart } from "@Services/cart/cart.types";
import CartListItemComponent from "./cart-list-item";

describe("CartListItemComponent", () => {
  it("should instantiate", () => {
    const instance = new CartListItemComponent({} as Cart, {
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
    });
    expect(instance).toBeInstanceOf(CartListItemComponent);
  });
});
