import { ViewBuilder } from "@Interfaces/view-builder";
import fallbackImage from "assets/images/card-empty.png";
import { ProductInformationProps } from "./product-information.types";

export default class ProductInformationView extends ViewBuilder {
  private informationElement: HTMLDivElement;
  private titleElement: HTMLHeadingElement;
  private imageElement: HTMLImageElement;
  private descriptionElement: HTMLParagraphElement;
  private wrapperElement: HTMLDivElement;
  private descriptionWrapperElement: HTMLDivElement;
  private imageWrapperElement: HTMLDivElement;
  private descriptionHeaderElement: HTMLHeadingElement;

  constructor({ title, description, imageUrl }: ProductInformationProps) {
    super();
    this.informationElement = this.createInformationElement();
    this.titleElement = this.createTitleElement(title);
    this.wrapperElement = this.createWrapperElement();
    this.imageWrapperElement = this.createImageWrapperElement();
    this.descriptionWrapperElement = this.createDescriptionWrapperElement();
    this.descriptionHeaderElement = this.createDescriptionHeader();
    this.imageElement = this.createImageElement(imageUrl);
    this.descriptionElement = this.createDescriptionElement(description);
  }

  createInformationElement(): HTMLDivElement {
    const information = this.createElement<HTMLDivElement>("div");

    return information;
  }

  createTitleElement(title: string): HTMLHeadingElement {
    const titleElement = this.createElement<HTMLHeadingElement>("h1");
    titleElement.textContent = title;

    return titleElement;
  }

  createImageWrapperElement(): HTMLDivElement {
    const imageWrapperElement = this.createElement<HTMLDivElement>("div", {
      classes: ["col-12", "col-lg-7"],
    });

    return imageWrapperElement;
  }

  createDescriptionWrapperElement(): HTMLDivElement {
    const descriptionWrapperElement = this.createElement<HTMLDivElement>("div", {
      classes: ["col-12", "col-lg-5"],
    });

    return descriptionWrapperElement;
  }

  createDescriptionHeader(): HTMLHeadingElement {
    const descriptionHeader = this.createElement<HTMLHeadingElement>("h6");
    descriptionHeader.textContent = "Description";

    return descriptionHeader;
  }

  createWrapperElement(): HTMLDivElement {
    const wrapperElement = this.createElement<HTMLDivElement>("div", {
      classes: ["row"],
    });

    return wrapperElement;
  }

  createImageElement(imageUrl: string): HTMLImageElement {
    const imageElement = this.createElement<HTMLImageElement>("img", {
      classes: ["img-fluid"],
    });

    imageElement.src = imageUrl;

    imageElement.onerror = () => {
      imageElement.src = fallbackImage;
    };

    return imageElement;
  }

  createDescriptionElement(description: string): HTMLParagraphElement {
    const descriptionElement = this.createElement<HTMLParagraphElement>("p");
    descriptionElement.textContent = description;

    return descriptionElement;
  }

  createDividerElement(): HTMLHRElement {
    return this.createElement<HTMLHRElement>("hr");
  }

  render(deliveryDetails: HTMLElement, returnDetails: HTMLElement) {
    this.descriptionWrapperElement.append(
      this.descriptionHeaderElement,
      this.descriptionElement,
      this.createDividerElement(),
      deliveryDetails,
      this.createDividerElement(),
      returnDetails
    );
    this.imageWrapperElement.append(this.imageElement);
    this.wrapperElement.append(this.imageWrapperElement, this.descriptionWrapperElement);
    this.informationElement.append(this.titleElement, this.wrapperElement);

    return this.informationElement;
  }
}
