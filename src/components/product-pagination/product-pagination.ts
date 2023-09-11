import "./product-pagination.scss";
import ProductPaginationView from "./product-pagination.view";
import eventBusService from "@Services/event-bus/event-bus";
import { Events, EventData } from "@Services/event-bus/event-bus.types";
import ObjectGuardUtil from "@Utils/object-guard/object-guard";

export default class ProductPaginationComponent {
  private view: ProductPaginationView;
  private pageCurrent = 1;
  private pageMin = 1;
  private pageMax = 1;

  constructor() {
    this.view = new ProductPaginationView();
    this.view.prevPageListener(this.prevPageHandler.bind(this));
    this.view.nextPageListener(this.nextPageHandler.bind(this));

    this.view.hideArrow("prev");

    eventBusService.subscribe(Events.moveByCategory, this.defaultPage.bind(this));
    eventBusService.subscribe(Events.getAllProductsInCategory, this.setPageMaxCount.bind(this));
  }

  private setPageMaxCount(data?: EventData) {
    const hasData = ObjectGuardUtil.hasProp<number>(data, "productsInCategory");

    if (hasData) {
      this.pageMax = Math.max(1, Math.floor(data.productsInCategory / 6));
      this.updateArrowVisibility();
    }
  }

  private updateArrowVisibility() {
    if (this.pageCurrent === this.pageMin) {
      this.view.hideArrow("prev");
    } else {
      this.view.showArrow("prev");
    }

    if (this.pageCurrent === this.pageMax) {
      this.view.hideArrow("next");
    } else {
      this.view.showArrow("next");
    }
  }

  private prevPageHandler(e: Event) {
    e.preventDefault();
    this.pageCurrent = Math.max(this.pageMin, this.pageCurrent - 1);
    this.view.updatePageNumber(this.pageCurrent);
    this.updateArrowVisibility();
    this.publishPageSwitchEvent();
  }

  private nextPageHandler(e: Event) {
    e.preventDefault();
    this.pageCurrent = Math.min(this.pageMax, this.pageCurrent + 1);
    this.view.updatePageNumber(this.pageCurrent);
    this.updateArrowVisibility();
    this.publishPageSwitchEvent();
  }

  private defaultPage() {
    this.pageCurrent = this.pageMin;
    this.view.updatePageNumber(this.pageCurrent);
    this.view.hideArrow("prev");
  }

  private publishPageSwitchEvent() {
    eventBusService.publish(Events.pageSwitch, { page: this.pageCurrent });
  }

  init() {
    return this.view.render();
  }
}
