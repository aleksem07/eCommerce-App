import { LINE_ITEMS_COUNT_LS } from "@Services/cart/cart.types";
import CartIconComponent from "./cart-icon";

describe("CartIconComponent", () => {
  it("should instantiate", () => {
    const instance = new CartIconComponent();
    expect(instance).toBeInstanceOf(CartIconComponent);
  });

  it("should show line items count as 0", () => {
    const instance = new CartIconComponent();
    const element = instance.init();

    const countBadge = element.querySelector<HTMLSpanElement>(".badge");

    expect(countBadge?.textContent).toBe("0");
  });

  it("should show line items count from local storage", () => {
    localStorage.setItem(LINE_ITEMS_COUNT_LS, "5");
    const instance = new CartIconComponent();
    const element = instance.init();

    const countBadge = element.querySelector<HTMLSpanElement>(".badge");

    expect(countBadge?.textContent).toBe("5");
  });
});
