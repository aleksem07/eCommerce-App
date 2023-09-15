import "./promo-code.scss";
import { ViewBuilder } from "@Interfaces/view-builder";

export default class PromoCodeView extends ViewBuilder {
  private element: HTMLElement;
  private promoCode: HTMLElement;

  constructor(promoCodeFormControl: HTMLElement) {
    super();
    this.element = this.createElement("div");
    this.promoCode = this.createPromoCodeInput(promoCodeFormControl);

    this.element.append(this.promoCode);
  }

  private createPromoCodeInput(promoCodeInput: HTMLElement) {
    const container = this.createElement("form", {
      classes: ["input-group", "mb-3", "align-items-end"],
    });

    // const containerButton = this.createElement("div", {
    //   classes: ["input-group-append"],
    // });

    const buttonApply = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn", "btn-primary", "px-4", "promo-code-button"],
    });
    buttonApply.textContent = "Apply";
    buttonApply.setAttribute("type", "button");

    // containerButton.append(buttonApply);
    container.append(promoCodeInput, buttonApply);

    return container;
  }

  inputSubmit(handler: (promoCode: string) => void) {
    this.promoCode.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("submit");
      const promoCode = this.getElement<HTMLInputElement>("#promo-code-promo-code-input");

      if (promoCode) {
        handler(promoCode.value);
      }
    });
  }

  render() {
    return this.element;
  }
}
