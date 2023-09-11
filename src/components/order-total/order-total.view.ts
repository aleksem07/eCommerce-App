import { ViewBuilder } from "@Interfaces/view-builder";
import { Price } from "@Services/product/product.types";

export default class OrderTotalView extends ViewBuilder {
  private element: HTMLElement;
  private title: HTMLElement;
  private subtotalCost: HTMLElement;
  private shippingCost: HTMLElement;
  private discount: HTMLElement;
  private tax: HTMLElement;
  private total: HTMLElement;

  private completeOrderButton: HTMLElement;

  constructor(totalPrice: Price) {
    super();
    const totalCost = totalPrice.value;
    const PERCENT = 10;
    const SHIPPING_COSTS = totalCost === 0 ? 0 : 30;
    const TAX = parseFloat(((totalCost * PERCENT) / 100).toFixed(2));
    const total = parseFloat((totalCost + SHIPPING_COSTS + TAX).toFixed(2));
    this.element = this.createElement("div");
    this.title = this.createElement("h3");
    this.title.textContent = "Order totals";
    this.subtotalCost = this.createCost("Subtotal", totalCost);
    this.shippingCost = this.createCost("Shipping costs", SHIPPING_COSTS);
    this.discount = this.createCost("Discount", 0);
    this.tax = this.createCost("Estimated sales tax", TAX);
    this.total = this.createCost("Order total", total);

    this.completeOrderButton = this.createElement("button", {
      classes: ["btn", "btn-primary", "w-100"],
    });
    this.completeOrderButton.textContent = "Complete order";

    this.element.append(
      this.title,
      this.subtotalCost,
      this.shippingCost,
      this.discount,
      this.tax,
      this.total,
      this.completeOrderButton
    );
  }

  private createCost(title: string, price: number): HTMLElement {
    const costContainer = this.createElement("div", {
      classes: ["d-flex", "justify-content-between", "align-items-center", "mb-2"],
    });
    const costTitle = this.createElement("h6", {
      classes: ["m-0"],
    });
    costTitle.textContent = `${title}:`;
    const cost = this.createElement("div");
    cost.textContent = "$" + price.toString();

    costContainer.append(costTitle, cost);

    return costContainer;
  }

  render() {
    return this.element;
  }
}
