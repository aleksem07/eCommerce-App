import ProductPriceComponent from "@Components/product-price/product-price";
import { ProductCardProps } from "./product-card.types";
import ProductCardView from "./product-card.view";
import "./product-card.scss";
import CartService from "@Services/cart/cart";

export default class ProductCardComponent {
  private view: ProductCardView;
  private price: ProductPriceComponent;
  private cartService: CartService;
  private id: string;

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
    this.id = id;
    this.price = new ProductPriceComponent({ price, discountedPrice });
    this.cartService = new CartService();
    this.view.clickButtonCardListener((e: Event) => this.clickButtonCardHandler(e, onClick));
  }

  private clickButtonCardHandler(e: Event, onClick?: (e: Event) => void) {
    if (onClick) {
      onClick(e);
    }
  }

  private async checkCartHasProduct(): Promise<boolean> {
    const cart = await this.cartService.getCart();

    const lineItem = cart?.lineItems?.find((item) => item.productId === this.id);

    return !!lineItem;
  }

  async init() {
    const priceElement = this.price.init();
    const hasProduct = await this.checkCartHasProduct();

    return this.view.render(priceElement, hasProduct);
  }
}
