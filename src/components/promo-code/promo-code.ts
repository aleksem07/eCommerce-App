import CartService from "@Services/cart/cart";
import PromoCodeView from "./promo-code.view";
import FormControlComponent from "@Components/form-control/form-control";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";

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
      disabled: false,
    });
  }

  async inputSubmitHandler(promoCode: string) {
    const cart = await this.cartService.applyPromoCodeCart(promoCode);

    if (cart) {
      eventBusService.publish(Events.updateCart);
    }
  }

  init() {
    return this.view.render();
  }
}
