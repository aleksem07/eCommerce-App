import { ViewBuilder } from "@Interfaces/view-builder";
import { ProductExtraDescriptionProps } from "./product-extra-description.types";

export default class ProductExtraDescriptionView extends ViewBuilder {
  private element: HTMLElement;
  private titleElement: HTMLHeadingElement;
  private contentElement: HTMLParagraphElement;
  private listElement: HTMLUListElement;

  constructor({ title, content, list }: ProductExtraDescriptionProps) {
    super();
    this.element = this.createElement("div");

    this.titleElement = this.createTitleElement(title);
    this.contentElement = this.createContentElement(content);
    this.listElement = this.createListElement(list);
  }

  createTitleElement(title: string): HTMLHeadingElement {
    const titleElement = this.createElement<HTMLHeadingElement>("h6");
    titleElement.textContent = title;

    return titleElement;
  }

  createContentElement(content: string): HTMLParagraphElement {
    const contentElement = this.createElement<HTMLParagraphElement>("p");
    contentElement.textContent = content;

    return contentElement;
  }

  createListElement(list: string[]): HTMLUListElement {
    const listElement = this.createElement<HTMLUListElement>("ul");
    const listItems = list.map((item) => {
      const listItem = this.createElement<HTMLLIElement>("li");
      listItem.textContent = item;

      return listItem;
    });

    listElement.append(...listItems);

    return listElement;
  }

  render() {
    this.element.append(this.titleElement, this.contentElement, this.listElement);

    return this.element;
  }
}
