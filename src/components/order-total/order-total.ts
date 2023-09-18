import OrderTotalView from "./order-total.view";
import { Price } from "@Services/product/product.types";

export default class OrderTotalComponent {
  private view: OrderTotalView;

  constructor(totalPrice: Price, discount: number) {
    this.view = new OrderTotalView(totalPrice, discount);
  }

  init() {
    return this.view.render();
  }
}
