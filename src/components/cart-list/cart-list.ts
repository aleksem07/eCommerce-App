import CartListItemComponent from "@Components/cart-list-item/cart-list-item";
import CartListView from "./cart-list.view";
import { LineItem } from "@Services/cart/cart.types";
import { Price } from "@Services/product/product.types";
import ProductPriceComponent from "@Components/product-price/product-price";

export default class CartListComponent {
  private view: CartListView;
  private lineItems: LineItem[];
  private totalPrice: ProductPriceComponent;

  constructor(lineItems: LineItem[], totalPrice: Price) {
    this.view = new CartListView();
    this.lineItems = lineItems;
    this.totalPrice = new ProductPriceComponent({ price: totalPrice, classes: ["ms-2"] });
  }

  init() {
    const cartListItems = this.lineItems.map((lineItem) =>
      new CartListItemComponent(lineItem).init()
    );

    return this.view.render(cartListItems, this.totalPrice.init());
  }
}
