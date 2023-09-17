import { LINE_ITEMS_COUNT_LS } from "@Services/cart/cart.types";
import CartIconView from "./cart-icon.view";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";

export default class CartIconComponent {
  private view: CartIconView;
  private lineItemsCount = "0";

  constructor() {
    this.view = new CartIconView();

    eventBusService.subscribe(Events.updateCart, this.init.bind(this));
    eventBusService.subscribe(Events.userLogin, this.init.bind(this));
    eventBusService.subscribe(Events.logoutLinkClicked, this.init.bind(this));
  }

  init() {
    this.lineItemsCount = localStorage.getItem(LINE_ITEMS_COUNT_LS) || "0";

    return this.view.render(this.lineItemsCount);
  }
}
