import { ViewBuilder } from "@Interfaces/view-builder";
import fallbackImage from "assets/images/card-empty.png";
import { ProductCardProps } from "./product-card.types";
import { Routes } from "@Services/router/router.types";

export default class ProductCardView extends ViewBuilder {
  private cardBody: HTMLDivElement;
  private imageElement: HTMLImageElement;
  private titleElement: HTMLHeadingElement;
  private descriptionElement: HTMLParagraphElement;
  private card: HTMLLinkElement;
  private addToCartButton: HTMLElement;
  private cardLink: HTMLLinkElement;

  constructor({ title, description, images, id }: ProductCardProps) {
    super();
    this.card = this.createCard();
    this.cardLink = this.createCardLink(id);
    this.cardBody = this.createCardBody();
    this.imageElement = this.createImageElement(images);
    this.titleElement = this.createTitleElement(title);
    this.descriptionElement = this.createDescriptionElement(description);
    this.addToCartButton = this.createAddToCartButton();
  }

  private createCard() {
    this.card = this.createElement("div", {
      classes: ["card", "card-animation", "text-decoration-none"],
    });

    return this.card;
  }

  private createCardLink(id: string) {
    this.cardLink = this.createElement<HTMLLinkElement>("a", {
      classes: ["text-decoration-none"],
    });
    const url = new URL(`${window.location.origin}${Routes.PRODUCT}-${id}`);
    this.cardLink.href = url.href;

    return this.cardLink;
  }

  private createCardBody() {
    this.cardBody = this.createElement<HTMLDivElement>("div", {
      classes: ["card-body"],
    });

    return this.cardBody;
  }

  private createImageElement(images: string[]) {
    this.imageElement = this.createElement<HTMLImageElement>("img", {
      classes: ["card-img-top"],
    });
    this.imageElement.alt = "Card image";
    this.imageElement.height = 250;
    this.imageElement.src = images[0];

    this.imageElement.onerror = () => {
      this.imageElement.src = fallbackImage;
    };

    return this.imageElement;
  }

  private createTitleElement(title: string) {
    this.titleElement = this.createElement<HTMLHeadingElement>("h6", {
      classes: ["card-title"],
    });
    this.titleElement.textContent = title;

    return this.titleElement;
  }

  private createDescriptionElement(description: string) {
    this.descriptionElement = this.createElement<HTMLParagraphElement>("p", {
      classes: ["line-clamp", "text-muted", "card-text"],
    });
    this.descriptionElement.textContent = description;

    return this.descriptionElement;
  }

  private createAddToCartButton() {
    const button = this.createElement("button", { classes: ["btn", "btn-primary"] });
    button.textContent = "Add to Cart";
    // button.addEventListener("click", this.addToCA.bind(this));

    return button;
  }

  clickListener(handler?: (e: Event) => void) {
    if (handler) {
      this.addToCartButton.addEventListener("click", handler);
    }
  }

  render(priceElement: HTMLElement) {
    this.card.append(this.cardLink, this.addToCartButton);
    this.cardLink.append(this.imageElement, this.cardBody);
    this.cardBody.append(this.titleElement, this.descriptionElement, priceElement);

    return this.card;
  }
}
