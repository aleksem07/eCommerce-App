import PromoCodeComponent from "./promo-code";
import FormControlComponent from "@Components/form-control/form-control";
import CartService from "@Services/cart/cart";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import Cart from "@Services/cart/cart.types";

describe("PromoCodeComponent", () => {
  let promoCodeComponent: PromoCodeComponent;
  let promoCodeFormControlMock: jest.Mocked<FormControlComponent>;
  let cartServiceMock: jest.Mocked<CartService>;

  beforeEach(() => {
    promoCodeFormControlMock = new FormControlComponent({
      formName: "promo-code",
      inputName: "promo-code",
      labelText: "Apply a promo code",
      helpText: "",
      placeholderText: "Enter promo code",
      type: "text",
      classes: ["form-control", "border-0", "p-0"],
      disabled: false,
    }) as jest.Mocked<FormControlComponent>;
    cartServiceMock = new CartService() as jest.Mocked<CartService>;

    promoCodeComponent = new PromoCodeComponent();
    promoCodeComponent["promoCode"] = promoCodeFormControlMock;
    promoCodeComponent["cartService"] = cartServiceMock;
  });

  it("should initialize PromoCodeComponent correctly", () => {
    expect(promoCodeComponent).toBeInstanceOf(PromoCodeComponent);
    expect(promoCodeComponent["promoCode"]).toBe(promoCodeFormControlMock);
    expect(promoCodeComponent["cartService"]).toBe(cartServiceMock);
  });

  it("should call inputSubmitHandler method correctly", async () => {
    const promoCode = "TEST_PROMO_CODE";
    const cart: Cart = { id: "TEST_CART_ID", version: 1, items: [] };
    const applyPromoCodeCartSpy = jest
      .spyOn(cartServiceMock, "applyPromoCodeCart")
      .mockResolvedValue(Promise.resolve(cart));
    const publishSpy = jest.spyOn(eventBusService, "publish");

    await promoCodeComponent["inputSubmitHandler"](promoCode);

    expect(applyPromoCodeCartSpy).toHaveBeenCalledWith(promoCode);
    expect(publishSpy).toHaveBeenCalledWith(Events.updateCart);
  });

  it("should call init method correctly", () => {
    const renderSpy = jest.spyOn(promoCodeFormControlMock, "init");

    promoCodeComponent.init();

    expect(renderSpy).toHaveBeenCalled();
  });
});
