import { ProductCardProps } from "@Components/product-card/product-card.types";
import { ViewBuilder } from "@Interfaces/view-builder";
import fallbackImage from "assets/images/card-empty.png";

export default class ProductInformationView extends ViewBuilder {
  private informationElement: HTMLDivElement;
  private titleElement: HTMLHeadingElement;
  private imageElement: HTMLImageElement;
  private descriptionElement: HTMLParagraphElement;

  constructor({ title, description, imageUrl }: ProductCardProps) {
    super();
    this.informationElement = this.createInformationElement();
    this.titleElement = this.createTitleElement(title);
    this.imageElement = this.createImageElement(imageUrl);
    this.descriptionElement = this.createDescriptionElement(description);
  }

  createInformationElement(): HTMLDivElement {
    const information = this.createElement<HTMLDivElement>("div");

    return information;
  }

  createTitleElement(title = "Product"): HTMLHeadingElement {
    const titleElement = this.createElement<HTMLHeadingElement>("h2");
    titleElement.textContent = title;

    return titleElement;
  }

  createImageElement(imageUrl = "ImageURL"): HTMLImageElement {
    const imageElement = this.createElement<HTMLImageElement>("img");

    imageElement.src = imageUrl;
    imageElement.height = 300;

    imageElement.onerror = () => {
      imageElement.src = fallbackImage;
    };

    return imageElement;
  }

  createDescriptionElement(
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  ): HTMLParagraphElement {
    const descriptionElement = this.createElement<HTMLParagraphElement>("p");
    descriptionElement.textContent = description;

    return descriptionElement;
  }

  render() {
    this.informationElement.append(this.titleElement, this.imageElement, this.descriptionElement);

    return this.informationElement;
  }
}
