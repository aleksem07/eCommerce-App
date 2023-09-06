import { ViewBuilder } from "@Interfaces/view-builder";

export default class CartListItemView extends ViewBuilder {
  private element: HTMLElement;
  private itemWrapper: HTMLDivElement;
  private imageElement: HTMLImageElement;
  private headerElement: HTMLHeadingElement;
  private quantityInputElement: HTMLInputElement;

  constructor(imageUrl: string, itemName: string) {
    super();
    this.element = this.createElement("div");
    this.itemWrapper = this.createItemWrapper();
    this.imageElement = this.createImageElement(imageUrl);
    this.headerElement = this.createHeaderElement(itemName);
    this.quantityInputElement = this.createQuantityInputElement();
  }

  createItemWrapper(): HTMLDivElement {
    const itemWrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["d-flex", "justify-content-between", "align-items-center"],
    });

    return itemWrapper;
  }

  createImageElement(imageUrl: string): HTMLImageElement {
    const image = this.createElement<HTMLImageElement>("img", {
      classes: ["img-fluid"],
    });
    image.src = imageUrl;

    return image;
  }

  createHeaderElement(itemName: string): HTMLHeadingElement {
    const header = this.createElement<HTMLHeadingElement>("h5");
    header.textContent = itemName;

    return header;
  }

  createQuantityInputElement(): HTMLInputElement {
    const input = this.createElement<HTMLInputElement>("input", {
      classes: ["form-control", "form-control-sm", "p-1"],
    });
    input.type = "number";
    input.min = "1";
    input.max = "10";

    return input;
  }

  render() {
    this.element.innerHTML = "";
    this.element.append(this.itemWrapper);

    return this.element;
  }
}
