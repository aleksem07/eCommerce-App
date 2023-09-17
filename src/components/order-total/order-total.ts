import OrderTotalView from "./order-total.view";
import { Price } from "@Services/product/product.types";

export default class OrderTotalComponent {
  private view: OrderTotalView;

  constructor(totalPrice: Price, discountPrice: number) {
    this.view = new OrderTotalView(totalPrice, discountPrice);
  }

  init() {
    return this.view.render();
  }
}
