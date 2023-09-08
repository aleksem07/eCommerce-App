import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductActionsView extends ViewBuilder {
  buttonWrapperElement: HTMLDivElement;
  addToCartButton: HTMLButtonElement;
  removeFromCartButton: HTMLButtonElement;

  constructor() {
    super();

    this.buttonWrapperElement = this.createButtonWrapperElement();
    this.addToCartButton = this.createAddToCartButton();
    this.removeFromCartButton = this.createRemoveFromCartButton();
  }

  createButtonWrapperElement(): HTMLDivElement {
    const buttonWrapperElement = this.createElement<HTMLDivElement>("div", {
      classes: ["d-flex", "justify-content-flex-start"],
    });

    return buttonWrapperElement;
  }

  createAddToCartButton(disabled = false): HTMLButtonElement {
    const addToCartButton = this.createElement<HTMLButtonElement>("button", {
      classes: [
        "btn",
        "btn-primary",
        "mt-5",
        "mb-5",
        "d-flex",
        "align-items-center",
        "justify-content-center",
      ],
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

  createRemoveFromCartButton(disabled = false): HTMLButtonElement {
    const removeFromCartButton = this.createElement<HTMLButtonElement>("button", {
      classes: [
        "btn",
        "btn-primary",
        "mt-5",
        "mb-5",
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

  render() {
    this.buttonWrapperElement.append(this.addToCartButton, this.removeFromCartButton);

    return this.buttonWrapperElement;
  }
}
