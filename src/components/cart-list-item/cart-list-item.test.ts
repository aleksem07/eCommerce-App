import { Cart } from "@Services/cart/cart.types";
import CartListItemComponent from "./cart-list-item";

const updateListItemQuantityMock = jest.fn();

jest.mock("@Services/cart/cart", () => {
  return jest.fn().mockImplementation(() => {
    return {
      updateListItemQuantity: updateListItemQuantityMock,
    };
  });
});

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

  it("should change quantity", () => {
    const lineItemIdMock = "line-item-id";
    const cartMock = {
      id: "cart-id",
      version: 1,
    };
    const instance = new CartListItemComponent(cartMock as Cart, {
      name: "test",
      quantity: 1,
      images: ["test"],
      price: { value: 1, currencyCode: "USD" },
      discountedPrice: { value: 2, currencyCode: "USD" },
      totalPrice: {
        value: 3,
        currencyCode: "USD",
      },
      id: lineItemIdMock,
      productId: "test",
    });
    const element = instance.init();
    const quantityInputElement = element.querySelector("input") as HTMLInputElement;

    // Change the value and trigger a change event
    quantityInputElement.value = "2";
    const changeEvent = new Event("change", { bubbles: true });
    quantityInputElement.dispatchEvent(changeEvent);

    expect(updateListItemQuantityMock).toHaveBeenCalledWith(cartMock, lineItemIdMock, 2);
  });
});
