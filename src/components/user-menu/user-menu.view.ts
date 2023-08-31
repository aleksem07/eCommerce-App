import { ViewBuilder } from "@Interfaces/view-builder";

export default class UserMenuView extends ViewBuilder {
  listGroup: HTMLDivElement;

  constructor() {
    super();
    this.listGroup = this.createListGroup();
  }

  private createListGroup(): HTMLDivElement {
    const listGroup = this.createElement<HTMLDivElement>("div", {
      classes: ["list-group"],
    });

    const activeItem = this.createListGroupItem("List group item heading", "user@example.com");
    const linkItem1 = this.createIconLinkItem("My profile", "bi-person", true);
    const linkItem2 = this.createIconLinkItem("Sign out", "bi-box-arrow-right");

    listGroup.append(activeItem, linkItem1, linkItem2);

    return listGroup;
  }

  private createListGroupItem(heading: string, content: string): HTMLDivElement {
    const classes = ["list-group-item", "list-group-item-action"];

    const item = this.createElement<HTMLDivElement>("div", {
      classes,
    });

    const headingElement = this.createElement("h5", { classes: ["mb-3"] });
    headingElement.textContent = heading;
    const contentElement = this.createElement("p", { classes: ["mb-3", "text-muted"] });
    contentElement.textContent = content;

    item.append(headingElement, contentElement);

    return item;
  }

  private createIconLinkItem(
    label: string,
    iconClass: string,
    isActive?: boolean
  ): HTMLButtonElement {
    const classes = ["list-group-item", "list-group-item-action", "icon-link"];

    if (isActive) {
      classes.push("active");
    }
    const item = this.createElement<HTMLButtonElement>("button", {
      classes,
    });

    const icon = this.createIcon(iconClass);
    item.textContent = label;

    item.prepend(icon);

    return item;
  }

  render(): HTMLElement {
    return this.listGroup;
  }
}
