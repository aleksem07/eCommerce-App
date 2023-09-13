import OrderTotalView from "./order-total.view";
import { Price } from "@Services/product/product.types";

export default class OrderTotalComponent {
  private view: OrderTotalView;

  constructor(totalPrice: Price) {
    this.view = new OrderTotalView(totalPrice);
  }

  init() {
    return this.view.render();
  }
}
