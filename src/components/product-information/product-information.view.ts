import { ViewBuilder } from "@Interfaces/view-builder";
import { ProductInformationProps } from "./product-information.types";

export default class ProductInformationView extends ViewBuilder {
  private informationElement: HTMLDivElement;
  private titleElement: HTMLHeadingElement;
  private descriptionElement: HTMLParagraphElement;
  private wrapperElement: HTMLDivElement;
  private descriptionWrapperElement: HTMLDivElement;
  private imageWrapperElement: HTMLDivElement;
  private descriptionHeaderElement: HTMLHeadingElement;
  private addToCartButton: HTMLButtonElement;
  private removeFromCartButton: HTMLButtonElement;
  private buttonWrapperElement: HTMLDivElement;

  constructor({ title, description }: ProductInformationProps, iconClass: string) {
    super();
    this.informationElement = this.createInformationElement();
    this.titleElement = this.createTitleElement(title);
    this.wrapperElement = this.createWrapperElement();
    this.imageWrapperElement = this.createImageWrapperElement();
    this.descriptionWrapperElement = this.createDescriptionWrapperElement();
    this.descriptionHeaderElement = this.createDescriptionHeader();
    this.descriptionElement = this.createDescriptionElement(description);
    this.buttonWrapperElement = this.createButtonWrapperElement();
    this.addToCartButton = this.createAddToCartButton(iconClass);
    this.removeFromCartButton = this.createRemoveFromCartButton(iconClass);
  }

  private createInformationElement(): HTMLDivElement {
    const information = this.createElement<HTMLDivElement>("div");

    return information;
  }

  private createTitleElement(title: string): HTMLHeadingElement {
    const titleElement = this.createElement<HTMLHeadingElement>("h1");
    titleElement.textContent = title;

    return titleElement;
  }

  private createImageWrapperElement(): HTMLDivElement {
    const imageWrapperElement = this.createElement<HTMLDivElement>("div", {
      classes: ["col-12", "col-sm-6"],
    });

    return imageWrapperElement;
  }

  private createDescriptionWrapperElement(): HTMLDivElement {
    const descriptionWrapperElement = this.createElement<HTMLDivElement>("div", {
      classes: ["col-12", "col-sm-6"],
    });

    return descriptionWrapperElement;
  }

  private createDescriptionHeader(): HTMLHeadingElement {
    const descriptionHeader = this.createElement<HTMLHeadingElement>("h6", {
      classes: ["mt-3"],
    });
    descriptionHeader.textContent = "Description";

    return descriptionHeader;
  }

  private createWrapperElement(): HTMLDivElement {
    const wrapperElement = this.createElement<HTMLDivElement>("div", {
      classes: ["row"],
    });

    return wrapperElement;
  }

  createDescriptionElement(description: string): HTMLParagraphElement {
    const descriptionElement = this.createElement<HTMLParagraphElement>("p");
    descriptionElement.textContent = description;

    return descriptionElement;
  }

  createButtonWrapperElement(): HTMLDivElement {
    const buttonWrapperElement = this.createElement<HTMLDivElement>("div", {
      classes: ["d-flex", "justify-content-flex-start"],
    });

    return buttonWrapperElement;
  }

  createAddToCartButton(iconClass: string, disabled = false): HTMLButtonElement {
    const addToCartButton = this.createElement<HTMLButtonElement>("button", {
      classes: [
        "btn",
        "btn-primary",
        "mt-5",
        "mb-5",
        "d-flex",
        "align-items-center",
        "justify-content-center",
      ],
    });
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.type = "submit";
    addToCartButton.disabled = disabled;

    const iconWrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["me-2"],
    });
    const icon = this.createIcon(iconClass);
    iconWrapper.prepend(icon);
    addToCartButton.prepend(iconWrapper);

    return addToCartButton;
  }

  createRemoveFromCartButton(iconClass: string, disabled = false): HTMLButtonElement {
    const removeFromCartButton = this.createElement<HTMLButtonElement>("button", {
      classes: [
        "btn",
        "btn-primary",
        "mt-5",
        "mb-5",
        "d-flex",
        "align-items-center",
        "justify-content-center",
      ],
    });
    removeFromCartButton.textContent = "Remove from Cart";
    removeFromCartButton.type = "submit";
    removeFromCartButton.disabled = disabled;

    const iconWrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["me-2"],
    });
    const icon = this.createIcon(iconClass);
    iconWrapper.prepend(icon);
    removeFromCartButton.prepend(iconWrapper);

    return removeFromCartButton;
  }

  createDividerElement(): HTMLHRElement {
    return this.createElement<HTMLHRElement>("hr");
  }

  render({
    deliveryDetails,
    returnDetails,
    price,
    imageSlider,
  }: {
    deliveryDetails: HTMLElement;
    returnDetails: HTMLElement;
    price: HTMLElement;
    imageSlider: HTMLElement;
  }): HTMLElement {
    this.descriptionWrapperElement.append(
      price,
      this.descriptionHeaderElement,
      this.descriptionElement,
      this.createDividerElement(),
      this.buttonWrapperElement,
      this.createDividerElement(),
      deliveryDetails,
      this.createDividerElement(),
      returnDetails
    );
    this.buttonWrapperElement.append(this.addToCartButton, this.removeFromCartButton);
    this.imageWrapperElement.append(imageSlider);
    this.wrapperElement.append(this.imageWrapperElement, this.descriptionWrapperElement);
    this.informationElement.append(this.titleElement, this.wrapperElement);

    return this.informationElement;
  }
}
