import { ViewBuilder } from "@Interfaces/view-builder";
import fallbackImage from "assets/images/card-empty.png";
import { ProductCardProps } from "./product-card.types";

export default class ProductCardView extends ViewBuilder {
  private cardBody: HTMLDivElement;
  private imageElement: HTMLImageElement;
  private titleElement: HTMLHeadingElement;
  private descriptionElement: HTMLParagraphElement;
  private card: HTMLDivElement;

  constructor({ title, description, imageUrl }: ProductCardProps) {
    super();
    this.card = this.createCard();
    this.cardBody = this.createCardBody();
    this.imageElement = this.createImageElement(imageUrl);
    this.titleElement = this.createTitleElement(title);
    this.descriptionElement = this.createDescriptionElement(description);
  }

  private createCard() {
    this.card = this.createElement<HTMLDivElement>("div", {
      classes: ["card"],
    });

    return this.card;
  }

  private createCardBody() {
    this.cardBody = this.createElement<HTMLDivElement>("div", {
      classes: ["card-body"],
    });

    return this.cardBody;
  }

  private createImageElement(imageUrl: string) {
    this.imageElement = this.createElement<HTMLImageElement>("img", {
      classes: ["card-img-top"],
    });
    this.imageElement.alt = "Card image";
    this.imageElement.height = 250;
    this.imageElement.src = imageUrl;

    this.imageElement.onerror = () => {
      this.imageElement.src = fallbackImage;
    };

    return this.imageElement;
  }

  private createTitleElement(title: string) {
    this.titleElement = this.createElement<HTMLHeadingElement>("h5", {
      classes: ["card-title"],
    });
    this.titleElement.textContent = title;

    return this.titleElement;
  }

  private createDescriptionElement(description: string) {
    this.descriptionElement = this.createElement<HTMLParagraphElement>("p", {
      classes: ["card-text"],
    });
    this.descriptionElement.textContent = description;

    return this.descriptionElement;
  }

  render(priceElement: HTMLElement) {
    this.card.append(this.imageElement, this.cardBody);
    this.cardBody.append(this.titleElement, this.descriptionElement, priceElement);

    return this.card;
  }
}
