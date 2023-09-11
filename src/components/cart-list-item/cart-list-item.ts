import ProductPriceComponent from "@Components/product-price/product-price";
import CartListItemView from "./cart-list-item.view";
import { LineItem } from "@Services/cart/cart.types";

export default class CartListItemComponent {
  private view: CartListItemView;
  private productPrice: ProductPriceComponent;

  constructor(lineItem: LineItem) {
    this.view = new CartListItemView(lineItem);
    this.productPrice = new ProductPriceComponent({
      price: lineItem.price,
      discountedPrice: lineItem.discountedPrice,
    });
  }

  init() {
    const price = this.productPrice.init();

    return this.view.render(price);
  }
}
