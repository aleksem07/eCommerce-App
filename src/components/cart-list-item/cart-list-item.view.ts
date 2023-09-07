import { ViewBuilder } from "@Interfaces/view-builder";
import fallbackImage from "assets/images/card-empty.png";

export default class CartListItemView extends ViewBuilder {
  private item: HTMLElement;
  private imageElement: HTMLImageElement;
  private headerElement: HTMLHeadingElement;
  private quantityInputElement: HTMLInputElement;
  private itemButton: HTMLButtonElement;
  private imageWrapper: HTMLDivElement;
  private priceWrapper: HTMLDivElement;
  private inputWrapper: HTMLDivElement;
  private buttonWrapper: HTMLDivElement;

  constructor(imageUrl: string, itemName: string) {
    super();
    this.item = this.createItemWrapper();
    this.imageWrapper = this.createImageWrapper();
    this.imageElement = this.createImageElement(imageUrl);
    this.headerElement = this.createHeaderElement(itemName);
    this.quantityInputElement = this.createQuantityInputElement();
    this.itemButton = this.deleteItemButton();
    this.priceWrapper = this.createPriceWrapper();
    this.inputWrapper = this.createInputWrapper();
    this.buttonWrapper = this.createButtonWrapper();
  }

  private createItemWrapper(): HTMLDivElement {
    const itemWrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["justify-content-between", "align-items-center", "row", "g-3"],
    });

    return itemWrapper;
  }

  private createButtonWrapper(): HTMLDivElement {
    const buttonWrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["col-12", "col-md-2", "text-md-end"],
    });

    return buttonWrapper;
  }

  private createInputWrapper(): HTMLDivElement {
    const inputWrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["col-3", "col-md-2"],
    });

    return inputWrapper;
  }

  private createPriceWrapper(): HTMLDivElement {
    const priceWrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["col-12", "col-md-3"],
    });

    return priceWrapper;
  }

  private createImageWrapper(): HTMLDivElement {
    const imageWrapper = this.createElement<HTMLDivElement>("div", {
      classes: ["col-12", "col-md-2", "col-sm-12"],
    });

    return imageWrapper;
  }

  private createHeaderElement(itemName: string): HTMLHeadingElement {
    const header = this.createElement<HTMLHeadingElement>("h5", {
      classes: ["col-12", "col-md-3"],
    });
    header.textContent = "Item name";

    return header;
  }

  private createImageElement(imageUrl: string): HTMLImageElement {
    const image = this.createElement<HTMLImageElement>("img", {
      classes: ["img-fluid"],
    });
    image.src = fallbackImage;

    return image;
  }

  private createQuantityInputElement(): HTMLInputElement {
    const input = this.createElement<HTMLInputElement>("input", {
      classes: ["form-control", "form-control-sm", "p-1"],
    });
    input.type = "number";
    input.min = "1";
    input.max = "10";
    input.value = "1";

    return input;
  }

  private deleteItemButton(): HTMLButtonElement {
    const button = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn", "btn-outline-danger"],
    });
    button.textContent = "Delete";

    return button;
  }

  render(price: HTMLElement) {
    this.item.innerHTML = "";
    this.imageWrapper.append(this.imageElement);
    this.priceWrapper.append(price);
    this.inputWrapper.append(this.quantityInputElement);
    this.buttonWrapper.append(this.itemButton);
    this.item.append(
      this.imageWrapper,
      this.headerElement,
      this.inputWrapper,
      this.priceWrapper,
      this.buttonWrapper
    );

    return this.item;
  }
}
