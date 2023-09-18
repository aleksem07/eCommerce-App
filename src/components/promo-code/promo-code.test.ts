import PromoCodeComponent from "./promo-code";
import FormControlComponent from "@Components/form-control/form-control";
import CartService from "@Services/cart/cart";

// Mock dependencies
jest.mock("@Components/form-control/form-control");
jest.mock("@Services/cart/cart");

describe("PromoCodeComponent", () => {
  let promoCodeComponent: PromoCodeComponent;

  beforeEach(() => {
    promoCodeComponent = new PromoCodeComponent();
  });

  it("should create an instance of PromoCodeComponent", () => {
    expect(promoCodeComponent).toBeInstanceOf(PromoCodeComponent);
  });

  it("should create an instance of FormControlComponent with the correct configuration", () => {
    expect(FormControlComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        formName: "promo-code",
        inputName: "promo-code",
        labelText: "Apply a promo code",
        placeholderText: "Enter promo code",
        type: "text",
        classes: expect.arrayContaining(["form-control", "border-0", "p-0"]),
        disabled: false,
      })
    );
  });

  it("should create an instance of CartService", () => {
    expect(CartService).toHaveBeenCalled();
  });
});
