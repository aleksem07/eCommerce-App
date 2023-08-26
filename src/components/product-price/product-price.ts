import { Price } from "@Services/product/product.types";
import ProductPriceView from "./product-price.view";

export default class ProductPriceComponent {
  private view: ProductPriceView;

  constructor(price: Price, discountedPrice?: Price) {
    this.view = new ProductPriceView(price, discountedPrice);
  }

  init() {
    return this.view.render();
  }
}
