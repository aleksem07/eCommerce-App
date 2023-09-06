import "./product-pagination.scss";
import ProductPaginationView from "./product-pagination.view";
import eventBusService from "@Services/event-bus/event-bus";
import { Events, EventData } from "@Services/event-bus/event-bus.types";
import ObjectGuardUtil from "@Utils/object-guard/object-guard";

export default class ProductPaginationComponent {
  private view: ProductPaginationView;
  private pageCurrent = 1;
  private pageMin = 1;
  private pageMax: number;

  constructor() {
    this.view = new ProductPaginationView();
    this.pageMax = 1;
    this.view.prevPageListener(this.prevPageHandler.bind(this));
    this.view.nextPageListener(this.nextPageHandler.bind(this));

    this.view.hideArrow("prev");

    eventBusService.subscribe(Events.moveByCategory, this.defaultPage.bind(this));
    eventBusService.subscribe(Events.getAllProductsInCategory, this.setPageMaxCount.bind(this));
  }

  private setPageMaxCount(data?: EventData) {
    const hasData = ObjectGuardUtil.hasProp<number>(data, "productsInCategory");

    if (hasData) {
      this.pageMax = Math.floor(data.productsInCategory / 6);
      this.view.showArrow("next");

      if (this.pageMax <= 1) {
        this.pageMax = 1;
        this.view.hideArrow("next");
      }
    }
  }

  private prevPageHandler(e: Event) {
    e.preventDefault();
    this.pageCurrent--;

    if (this.pageCurrent < this.pageMin) {
      this.pageCurrent = this.pageMin;
    }
    this.view.updatePageNumber(this.pageCurrent);

    this.view.showArrow("next");

    if (this.pageCurrent === this.pageMin) {
      this.view.hideArrow("prev");
    } else {
      this.view.showArrow("prev");
    }

    eventBusService.publish(Events.pageSwitch, { page: this.pageCurrent });
  }

  private nextPageHandler(e: Event) {
    e.preventDefault();
    this.pageCurrent++;

    if (this.pageCurrent > this.pageMax) {
      this.pageCurrent = this.pageMax;
    }

    if (this.pageCurrent < this.pageMin) {
      this.pageCurrent = this.pageMin;
    }

    this.view.updatePageNumber(this.pageCurrent);

    this.view.showArrow("prev");

    if (this.pageCurrent === this.pageMax) {
      this.view.hideArrow("next");
    } else {
      this.view.showArrow("next");
    }

    eventBusService.publish(Events.pageSwitch, { page: this.pageCurrent });
  }

  private defaultPage() {
    this.pageCurrent = this.pageMin;
    this.view.updatePageNumber(this.pageCurrent);

    this.view.hideArrow("prev");
  }

  init() {
    return this.view.render();
  }
}
