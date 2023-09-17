import PromoCodeComponent from "./promo-code";
import FormControlComponent from "@Components/form-control/form-control";
import CartService from "@Services/cart/cart";

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
});
