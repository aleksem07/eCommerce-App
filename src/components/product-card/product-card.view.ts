import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductCardView extends ViewBuilder {
  private cardWrapperElement: HTMLDivElement;
  private imageElement: HTMLImageElement;
  private titleElement: HTMLHeadingElement;
  private descriptionElement: HTMLParagraphElement;

  constructor() {
    super();
    this.cardWrapperElement = this.createCardWrapper();
    this.imageElement = this.createImageElement();
    this.titleElement = this.createTitleElement();
    this.descriptionElement = this.createDescriptionElement();

    this.cardWrapperElement.append(this.imageElement, this.titleElement, this.descriptionElement);
  }

  createCardWrapper() {
    this.cardWrapperElement = this.createElement<HTMLDivElement>("div", {
      classes: ["card", "mb-3"],
    });

    return this.cardWrapperElement;
  }

  createImageElement() {
    this.imageElement = this.createElement<HTMLImageElement>("img", {
      classes: ["card-img-top"],
    });
    this.imageElement.src = "/";

    return this.imageElement;
  }

  createTitleElement() {
    this.titleElement = this.createElement<HTMLHeadingElement>("h5", {
      classes: ["card-title"],
    });

    return this.titleElement;
  }

  createDescriptionElement() {
    this.descriptionElement = this.createElement<HTMLParagraphElement>("p", {
      classes: ["card-text"],
    });

    return this.descriptionElement;
  }

  render() {
    return this.cardWrapperElement;
  }
}
