import { ViewBuilder } from "@Interfaces/view-builder";

export default class SortView extends ViewBuilder {
  private element: HTMLElement;
  pagination: HTMLElement;
  arrowRightIcon: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      classes: ["d-flex", "align-items-center", "justify-content-start", "mb-4"],
    });
    this.arrowRightIcon = this.createPaginationIcon("arrow-right");
    this.pagination = this.createElement("div", {
      classes: ["text-end", "h6"],
    });
    this.pagination.textContent = "1, 2, 3 ... 10";
  }

  private createPaginationIcon(iconName: string) {
    const paginationIcon = this.createIcon(`bi-${iconName}`);
    paginationIcon.classList.add("me-1");
    const i = this.createElement("i");
    i.appendChild(paginationIcon);

    return i;
  }

  render(toolbarElements: HTMLElement[]) {
    this.pagination.append(this.arrowRightIcon);
    this.element.append(...toolbarElements, this.pagination);

    return this.element;
  }
}
