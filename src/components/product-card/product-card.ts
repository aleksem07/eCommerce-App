import ProductPriceComponent from "@Components/product-price/product-price";
import { ProductCardProps } from "./product-card.types";
import ProductCardView from "./product-card.view";
import "./product-card.scss";

export default class ProductCardComponent {
  private view: ProductCardView;
  private price: ProductPriceComponent;

  constructor({
    title,
    description,
    images,
    price,
    discountedPrice,
    id,
    onClick,
  }: ProductCardProps) {
    this.view = new ProductCardView({ title, description, images, price, id });
    this.price = new ProductPriceComponent({ price, discountedPrice });
    this.view.clickListener((e: Event) => this.clickHandler(e, onClick));
  }

  private clickHandler(e: Event, onClick?: (e: Event) => void) {
    if (onClick) {
      onClick(e);
    }
  }

  init() {
    const priceElement = this.price.init();

    return this.view.render(priceElement);
  }
}
