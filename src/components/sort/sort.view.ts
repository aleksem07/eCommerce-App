import { ViewBuilder } from "@Interfaces/view-builder";

export default class SortView extends ViewBuilder {
  private toolbar: HTMLElement;
  pagination: HTMLElement;
  arrowLeftIcon: HTMLElement;
  arrowRightIcon: HTMLElement;

  constructor() {
    super();
    this.toolbar = this.createElement("div", {
      classes: ["toolbar", "row", "navbar"],
    });
    this.arrowLeftIcon = this.createPaginationIcon("arrow-left");
    this.arrowRightIcon = this.createPaginationIcon("arrow-right");
    this.pagination = this.createElement("div", {
      classes: ["pagination"],
    });
    this.pagination.textContent = "1, 2, 3 ... 10";
  }

  private createPaginationIcon(iconName: string) {
    const paginationIcon = this.createIcon(`bi-${iconName}`);
    paginationIcon.classList.add("me-1", "text-muted");
    const i = this.createElement("i");
    i.appendChild(paginationIcon);

    return i;
  }

  render(toolbarElements: HTMLElement[]) {
    this.pagination.prepend(this.arrowLeftIcon);
    this.pagination.append(this.arrowRightIcon);
    this.toolbar.append(...toolbarElements);

    return this.toolbar;
  }
}
