import { ViewBuilder } from "@Interfaces/view-builder";
import { Price } from "@Services/product/product.types";

export default class OrderTotalView extends ViewBuilder {
  private element: HTMLElement;
  private title: HTMLElement;
  private calculationContainer: HTMLElement;
  private costContainer: HTMLElement;
  private subtotalCost: HTMLElement;
  private shippingCost: HTMLElement;
  private discount: HTMLElement;
  private tax: HTMLElement;
  private total: HTMLElement;

  private completeOrderButton: HTMLElement;

  constructor(totalPrice: Price) {
    super();
    const totalCost = totalPrice.value;
    const PERCENT = 6;
    const SHIPPING_COSTS = totalCost === 0 ? 0 : 30;
    const TAX = parseFloat(((totalCost * PERCENT) / 100).toFixed(2));
    const total = parseFloat((totalCost + SHIPPING_COSTS + TAX).toFixed(2));
    this.element = this.createElement("div");
    this.costContainer = this.createElement("div", {
      classes: ["my-4", "p-4", "bg-light"],
    });
    this.title = this.createElement("h4", {
      classes: ["fw-bold"],
    });
    this.title.textContent = "Order totals";
    this.calculationContainer = this.createElement("div", {
      classes: ["my-3", "py-3", "border-top", "border-bottom"],
    });
    this.subtotalCost = this.createCost("Subtotal", totalCost);
    this.shippingCost = this.createCost("Shipping costs", SHIPPING_COSTS);
    this.discount = this.createCost("Discount", 0);
    this.tax = this.createCost("Estimated sales tax", TAX);
    this.total = this.createCost("Order total", total, "h5");

    this.completeOrderButton = this.createElement("button", {
      classes: ["btn", "btn-primary", "w-100"],
    });
    this.completeOrderButton.textContent = "Complete order";

    this.costContainer.append(this.title, this.calculationContainer, this.total);
    this.calculationContainer.append(this.subtotalCost, this.shippingCost, this.discount, this.tax);

    this.element.append(this.costContainer, this.completeOrderButton);
  }

  private createCost(title: string, price: number, titleSize = "h6"): HTMLElement {
    const costContainer = this.createElement("div", {
      classes: ["d-flex", "justify-content-between", "align-items-center", "mb-1"],
    });
    const costTitle = this.createElement(titleSize, {
      classes: ["m-0"],
    });
    costTitle.textContent = `${title}:`;
    const cost = this.createElement("div");
    cost.textContent = "$" + price.toString();

    if (titleSize !== "h6") {
      costTitle.classList.add("fw-bold");
      cost.classList.add("fw-bold");
    }

    costContainer.append(costTitle, cost);

    return costContainer;
  }

  render() {
    return this.element;
  }
}
