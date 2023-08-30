import eventBusService from "@Services/event-bus/event-bus";
import ProductModalView from "./product-modal.view";
import { Events } from "@Services/event-bus/event-bus.types";
import { Modal } from "bootstrap";

export default class ProductModalComponent {
  private view: ProductModalView;
  private modal!: HTMLElement;

  constructor() {
    this.view = new ProductModalView();

    eventBusService.subscribe(Events.showModal, this.init.bind(this));
  }

  hideModalListener() {
    this.modal.addEventListener("hidden.bs.modal", () => {
      this.modal.remove();
    });
  }

  init() {
    this.modal = this.view.render();
    document.body.append(this.modal);
    Modal.getOrCreateInstance(this.modal).show();

    this.hideModalListener();
  }
}
