import CartService from "@Services/cart/cart";
import PromoCodeView from "./promo-code.view";
import FormControlComponent from "@Components/form-control/form-control";

export default class PromoCodeComponent {
  private view: PromoCodeView;
  private promoCode: FormControlComponent;
  private cartService: CartService;

  constructor() {
    this.promoCode = this.createPromoCodeInput();
    this.view = new PromoCodeView(this.promoCode.init());
    this.view.inputSubmit(this.inputSubmitHandler.bind(this));
    this.cartService = new CartService();
  }

  private createPromoCodeInput() {
    return new FormControlComponent({
      formName: "promo-code",
      inputName: "promo-code",
      labelText: "Apply a promo code",
      helpText: "",
      placeholderText: "Enter promo code",
      type: "text",
      classes: ["form-control", "border-0", "p-0"],
    });
  }

  async inputSubmitHandler(promoCode: string) {
    console.log("promocode", promoCode);
    await this.cartService.applyPromoCodeCart(promoCode);
  }

  init() {
    return this.view.render();
  }
}
