import CartService from "@Services/cart/cart";
import ProductActionsComponent from "./product-actions";

describe("ProductActionsComponent", () => {
  it("should instantiate", () => {
    const instance = new ProductActionsComponent("id");
    expect(instance).toBeInstanceOf(ProductActionsComponent);
  });

  it("should show Add to cart button when product is not in cart", async () => {
    const PRODUCT_ID = "some-product-id";
    const getCartSpy = jest.spyOn(CartService.prototype, "getCart").mockResolvedValueOnce({
      id: "some-cart-id",
      version: 1,
      key: "some-cart-key",
      customerId: "some-customer-id",
      customerEmail: "some-customer-email",
      totalPrice: { value: 0, currencyCode: "USD" },
      lineItems: [
        {
          id: "some-cart-item-id",
          productId: PRODUCT_ID,
          quantity: 1,
          name: "some-product-name",
          price: { value: 100, currencyCode: "USD" },
          discountedPrice: { value: 90, currencyCode: "USD" },
          totalPrice: {
            value: 90,
            currencyCode: "USD",
          },
          images: [],
        },
      ],
    });
    const instance = new ProductActionsComponent(PRODUCT_ID);

    const element = await instance.init();

    const addToCartButton = element.querySelector(".btn-primary");
    expect(getCartSpy).toHaveBeenCalled();
    expect(addToCartButton).toBeDefined();
  });

  it("should show Remove from cart button when product is in cart", async () => {
    const getCartSpy = jest.spyOn(CartService.prototype, "getCart").mockResolvedValueOnce({
      id: "some-cart-id",
      version: 1,
      key: "some-cart-key",
      customerId: "some-customer-id",
      customerEmail: "some-customer-email",
      totalPrice: { value: 0, currencyCode: "USD" },
      lineItems: [
        {
          id: "some-cart-item-id",
          productId: "some-product-id",
          quantity: 1,
          name: "some-product-name",
          price: { value: 100, currencyCode: "USD" },
          discountedPrice: { value: 90, currencyCode: "USD" },
          totalPrice: {
            value: 90,
            currencyCode: "USD",
          },
          images: [],
        },
      ],
    });
    const instance = new ProductActionsComponent("some-another-product-id");

    const element = await instance.init();

    const removeFromCartButton = element.querySelector(".btn-outline-danger");
    expect(getCartSpy).toHaveBeenCalled();
    expect(removeFromCartButton).toBeDefined();
  });
});
