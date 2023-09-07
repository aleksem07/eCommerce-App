import ProductPriceComponent from "@Components/product-price/product-price";
import CartListItemView from "./cart-list-item.view";

export default class CartListItemComponent {
  private view: CartListItemView;
  private productPrice: ProductPriceComponent;

  constructor(imageUrl: string, itemName: string) {
    this.view = new CartListItemView(imageUrl, itemName);
    this.productPrice = new ProductPriceComponent({
      price: { currencyCode: "USD", value: 15.99 },
      discountedPrice: { currencyCode: "USD", value: 13.99 },
    });
  }

  init() {
    const price = this.productPrice.init();

    return this.view.render(price);
  }
}
