import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductModalView extends ViewBuilder {
  private modal: HTMLDivElement;
  private modalDialog: HTMLDivElement;
  private modalContent: HTMLDivElement;
  private modalHeader: HTMLDivElement;
  private modalBody: HTMLDivElement;
  private swiperContainer: HTMLDivElement;

  constructor() {
    super();
    this.modal = this.createModal();
    this.modalDialog = this.createModalDialog();
    this.modalContent = this.createModalContent();
    this.modalHeader = this.createModalHeader();
    this.modalBody = this.createModalBody();
    this.swiperContainer = this.createSwiperContainer();
  }

  createModal(): HTMLDivElement {
    const element = this.createElement<HTMLDivElement>("div", {
      classes: ["modal", "fade"],
      id: "product-modal",
    });
    element.setAttribute("tabindex", "-1");

    return element;
  }

  createModalDialog(): HTMLDivElement {
    return this.createElement<HTMLDivElement>("div", {
      classes: ["modal-dialog", "modal-lg"],
    });
  }

  createModalContent(): HTMLDivElement {
    return this.createElement<HTMLDivElement>("div", {
      classes: ["modal-content"],
    });
  }

  createModalHeader(): HTMLDivElement {
    const element = this.createElement<HTMLDivElement>("div", {
      classes: ["modal-header"],
    });
    const closeButton = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn-close"],
    });
    closeButton.type = "button";
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    element.appendChild(closeButton);

    return element;
  }

  createModalBody(): HTMLDivElement {
    return this.createElement<HTMLDivElement>("div", {
      classes: ["modal-body"],
    });
  }

  createSwiperContainer(): HTMLDivElement {
    return this.createElement<HTMLDivElement>("div", {
      classes: ["swiper"],
    });
  }

  render(): HTMLElement {
    this.modal.innerHTML = "";
    this.modalBody.appendChild(this.swiperContainer);
    this.modalContent.appendChild(this.modalHeader);
    this.modalContent.appendChild(this.modalBody);
    this.modalDialog.appendChild(this.modalContent);
    this.modal.appendChild(this.modalDialog);

    return this.modal;
  }
}
