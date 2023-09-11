import ProductPriceComponent from "@Components/product-price/product-price";
import CartListItemView from "./cart-list-item.view";
import { LineItem } from "@Services/cart/cart.types";

export default class CartListItemComponent {
  private view: CartListItemView;
  private productPrice: ProductPriceComponent;
  private totalPrice: ProductPriceComponent;

  constructor(lineItem: LineItem) {
    this.view = new CartListItemView(lineItem);
    this.totalPrice = new ProductPriceComponent({
      price: lineItem.totalPrice,
      size: "md",
      classes: ["justify-content-center"],
    });
    this.productPrice = new ProductPriceComponent({
      price: lineItem.price,
      discountedPrice: lineItem.discountedPrice,
      classes: ["mt-2"],
    });
  }

  init() {
    const price = this.productPrice.init();
    const total = this.totalPrice.init();

    return this.view.render(price, total);
  }
}
