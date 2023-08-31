import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductModalView extends ViewBuilder {
  swiperContainer: HTMLDivElement;
  private modal: HTMLDivElement;
  private modalDialog: HTMLDivElement;
  private modalContent: HTMLDivElement;
  private modalBody: HTMLDivElement;
  private images: string[] = [];
  private modalHeader: HTMLDivElement;

  constructor(images: string[]) {
    super();
    this.images = images;
    this.modal = this.createModal();
    this.modalHeader = this.createModalHeader();
    this.modalDialog = this.createModalDialog();
    this.modalContent = this.createModalContent();
    this.modalBody = this.createModalBody();
    this.swiperContainer = this.createSwiperContainer();
  }

  private createModal(): HTMLDivElement {
    const element = this.createElement<HTMLDivElement>("div", {
      classes: ["modal", "fade", "d-flex", "align-items-center"],
      id: "product-modal",
    });
    element.setAttribute("tabindex", "-1");

    return element;
  }

  private createModalDialog(): HTMLDivElement {
    return this.createElement<HTMLDivElement>("div", {
      classes: ["modal-dialog", "modal-lg", "modal-fullscreen-sm-down"],
    });
  }

  private createModalContent(): HTMLDivElement {
    return this.createElement<HTMLDivElement>("div", {
      classes: ["modal-content"],
    });
  }

  private createModalHeader(): HTMLDivElement {
    const element = this.createElement<HTMLDivElement>("div", {
      classes: ["modal-header"],
    });

    element.textContent = "Image Gallery";

    const closeButton = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn-close"],
    });
    closeButton.type = "button";
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    element.appendChild(closeButton);

    return element;
  }

  private createModalBody(): HTMLDivElement {
    return this.createElement<HTMLDivElement>("div", {
      classes: ["modal-body"],
    });
  }

  private createSwiperContainer(): HTMLDivElement {
    const container = this.createElement<HTMLDivElement>("div", {
      classes: ["swiper"],
    });

    const wrapper = this.createSwiperWrapper();
    this.images.forEach((imageUrl) => {
      const slide = this.createSwiperSlide(imageUrl);
      wrapper.append(slide);
    });

    container.append(
      wrapper,
      this.createSwiperNavigation("swiper-button-prev"),
      this.createSwiperNavigation("swiper-button-next")
    );

    return container;
  }

  private createSwiperWrapper(): HTMLDivElement {
    const wrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["swiper-wrapper"],
    });

    return wrapper;
  }

  private createSwiperSlide(imageUrl: string): HTMLDivElement {
    const slide = this.createElement<HTMLDivElement>("div", {
      classes: ["swiper-slide"],
    });
    const img = this.createElement<HTMLImageElement>("img", {
      classes: ["img-fluid"],
    });
    img.src = imageUrl;
    slide.appendChild(img);

    return slide;
  }

  private createSwiperNavigation(buttonClass: string): HTMLDivElement {
    const navigation = this.createElement<HTMLDivElement>("div", {
      classes: [buttonClass],
    });

    return navigation;
  }

  render(): HTMLElement {
    this.modal.innerHTML = "";
    this.modalBody.appendChild(this.swiperContainer);
    this.modalContent.append(this.modalHeader, this.modalBody);
    this.modalDialog.appendChild(this.modalContent);
    this.modal.appendChild(this.modalDialog);

    return this.modal;
  }
}
