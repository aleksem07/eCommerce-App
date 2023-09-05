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

  constructor({ title, description }: ProductInformationProps) {
    super();
    this.informationElement = this.createInformationElement();
    this.titleElement = this.createTitleElement(title);
    this.wrapperElement = this.createWrapperElement();
    this.imageWrapperElement = this.createImageWrapperElement();
    this.descriptionWrapperElement = this.createDescriptionWrapperElement();
    this.descriptionHeaderElement = this.createDescriptionHeader();
    this.descriptionElement = this.createDescriptionElement(description);
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
      deliveryDetails,
      this.createDividerElement(),
      returnDetails
    );
    this.imageWrapperElement.append(imageSlider);
    this.wrapperElement.append(this.imageWrapperElement, this.descriptionWrapperElement);
    this.informationElement.append(this.titleElement, this.wrapperElement);

    return this.informationElement;
  }
}
