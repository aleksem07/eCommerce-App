import { ViewBuilder } from "@Interfaces/view-builder";
import { Price } from "@Services/product/product.types";

export default class ProductPriceView extends ViewBuilder {
  private element: HTMLElement;
  private discountedPrice?: HTMLElement;
  private price: HTMLElement;
  private oldPrice: HTMLElement;

  constructor(price: Price, discountedPrice?: Price) {
    super();
    this.element = this.createElement("div");

    if (discountedPrice) {
      this.discountedPrice = this.createDiscountedPrice(discountedPrice);
    }
    this.price = this.createPrice(price);
    this.oldPrice = this.createOldPrice(price);
  }

  private createDiscountedPrice(price: Price): HTMLElement {
    const discountedPrice = this.createElement("div", {
      classes: ["text-danger", "fs-5", "fw-bold"],
    });
    discountedPrice.textContent = `$${price.value}`;

    return discountedPrice;
  }

  private createPrice(price: Price): HTMLElement {
    const priceElement = this.createElement("div", {
      classes: ["fw-bold", "fs-5"],
    });
    priceElement.textContent = `$${price.value}`;

    return priceElement;
  }

  private createOldPrice(price: Price): HTMLElement {
    const oldPrice = this.createElement("div", {
      classes: ["text-muted", "fs-6", "text-decoration-line-through"],
    });
    oldPrice.textContent = `$${price.value}`;

    return oldPrice;
  }

  render() {
    if (this.discountedPrice) {
      this.element.append(this.discountedPrice, this.oldPrice);
    } else {
      this.element.append(this.price);
    }

    return this.element;
  }
}
