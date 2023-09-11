import { ViewBuilder } from "@Interfaces/view-builder";
import { Price } from "@Services/product/product.types";
import { ProductPriceProps, ProductPriceSize } from "./product-price.types";

export default class ProductPriceView extends ViewBuilder {
  private element: HTMLElement;
  private discountedPrice?: HTMLElement;
  private price: HTMLElement;
  private oldPrice: HTMLElement;

  constructor({ price, discountedPrice, size = "sm", classes }: ProductPriceProps) {
    super();
    this.element = this.createElement("div", {
      classes: ["d-flex", "align-items-center", ...(classes || [])],
    });

    if (discountedPrice) {
      this.discountedPrice = this.createDiscountedPrice(discountedPrice, size);
    }
    this.price = this.createPrice(price, size);
    this.oldPrice = this.createOldPrice(price, size);
  }

  private createDiscountedPrice(price: Price, size: ProductPriceSize): HTMLElement {
    const fontSizeClass = size === "sm" ? "fs-5" : "fs-4";
    const discountedPrice = this.createElement("div", {
      classes: ["text-danger", fontSizeClass, "fw-bold"],
      dataset: [{ testid: "discounted-price" }],
    });
    discountedPrice.textContent = `$${price.value}`;

    return discountedPrice;
  }

  private createPrice(price: Price, size: ProductPriceSize): HTMLElement {
    const fontSizeClass = size === "sm" ? "fs-5" : "fs-4";
    const priceElement = this.createElement("div", {
      classes: ["fw-bold", fontSizeClass],
      dataset: [{ testid: "price" }],
    });
    priceElement.textContent = `$${price.value}`;

    return priceElement;
  }

  private createOldPrice(price: Price, size: ProductPriceSize): HTMLElement {
    const fontSizeClass = size === "sm" ? "fs-6" : "fs-5";
    const oldPrice = this.createElement("div", {
      classes: ["text-muted", fontSizeClass, "text-decoration-line-through", "ms-2"],
      dataset: [{ testid: "old-price" }],
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
