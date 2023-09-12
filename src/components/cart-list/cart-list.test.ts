import { Cart } from "@Services/cart/cart.types";
import CartListComponent from "./cart-list";

describe("CartListComponent", () => {
  it("should instantiate", () => {
    const instance = new CartListComponent({
      lineItems: [
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
      id: "test",
      version: 1,
      totalPrice: { value: 3, currencyCode: "USD" },
      customerEmail: "test",
      customerId: "test",
      key: "test",
    });
    expect(instance).toBeInstanceOf(CartListComponent);
  });

  it("should display line items", () => {
    const instance = new CartListComponent({
      lineItems: [
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
      id: "test",
      version: 1,
      totalPrice: { value: 3, currencyCode: "USD" },
      customerEmail: "test",
      customerId: "test",
      key: "test",
    });

    const element = instance.init();
    const lineItems = element.querySelectorAll(".cart-list-item");

    expect(lineItems).toHaveLength(1);
  });
});
