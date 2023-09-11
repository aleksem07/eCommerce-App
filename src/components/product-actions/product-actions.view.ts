import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductActionsView extends ViewBuilder {
  private buttonWrapperElement: HTMLDivElement;
  private addToCartButton: HTMLButtonElement;
  private removeFromCartButton: HTMLButtonElement;

  constructor() {
    super();

    this.buttonWrapperElement = this.createButtonWrapperElement();
    this.addToCartButton = this.createAddToCartButton();
    this.removeFromCartButton = this.createRemoveFromCartButton();
  }

  private createButtonWrapperElement(): HTMLDivElement {
    const buttonWrapperElement = this.createElement<HTMLDivElement>("div", {
      classes: ["d-flex", "justify-content-flex-start", "my-5"],
    });

    return buttonWrapperElement;
  }

  private createAddToCartButton(disabled = false): HTMLButtonElement {
    const addToCartButton = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn", "btn-primary", "d-flex", "align-items-center", "justify-content-center"],
    });
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.type = "submit";
    addToCartButton.disabled = disabled;

    const iconWrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["me-2"],
    });
    const icon = this.createIcon("bi-cart-plus");
    iconWrapper.prepend(icon);
    addToCartButton.prepend(iconWrapper);

    return addToCartButton;
  }

  private createRemoveFromCartButton(disabled = false): HTMLButtonElement {
    const removeFromCartButton = this.createElement<HTMLButtonElement>("button", {
      classes: [
        "btn",
        "btn-outline-danger",
        "d-flex",
        "align-items-center",
        "justify-content-center",
      ],
    });
    removeFromCartButton.textContent = "Remove from Cart";
    removeFromCartButton.type = "submit";
    removeFromCartButton.disabled = disabled;

    const iconWrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["me-2"],
    });
    const icon = this.createIcon("bi-cart-x");
    iconWrapper.prepend(icon);
    removeFromCartButton.prepend(iconWrapper);

    return removeFromCartButton;
  }

  addToCartListener(handler: () => void): void {
    this.addToCartButton.addEventListener("click", () => {
      handler();
    });
  }

  removeFromCartListener(handler: () => void): void {
    this.removeFromCartButton.addEventListener("click", () => {
      handler();
    });
  }

  render(hasProduct: boolean): HTMLDivElement {
    if (hasProduct) {
      this.addToCartButton.remove();
      this.buttonWrapperElement.append(this.removeFromCartButton);
    } else {
      this.removeFromCartButton.remove();
      this.buttonWrapperElement.append(this.addToCartButton);
    }

    return this.buttonWrapperElement;
  }
}
