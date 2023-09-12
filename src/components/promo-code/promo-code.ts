import PromoCodeView from "./promo-code.view";
import FormControlComponent from "@Components/form-control/form-control";

export default class PromoCodeComponent {
  private view: PromoCodeView;
  private promoCode: FormControlComponent;

  constructor() {
    this.promoCode = this.createPromoCodeInput();
    this.view = new PromoCodeView(this.promoCode.init());
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

  init() {
    return this.view.render();
  }
}
