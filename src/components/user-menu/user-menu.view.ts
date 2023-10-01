import { ViewBuilder } from "@Interfaces/view-builder";

export default class UserMenuView extends ViewBuilder {
  private listGroup: HTMLDivElement;
  private fullName: string;
  private email: string;

  private linkProfile: HTMLButtonElement;
  private logout: HTMLButtonElement;

  constructor(fullName: string, email: string) {
    super();
    this.fullName = fullName;
    this.email = email;
    this.linkProfile = this.createIconLinkItem("My profile", "bi-person", true);
    this.logout = this.createIconLinkItem("Logout", "bi-box-arrow-right");
    this.listGroup = this.createListGroup();
  }

  private createListGroup(): HTMLDivElement {
    const listGroup = this.createElement<HTMLDivElement>("div", {
      classes: ["list-group"],
    });

    const activeItem = this.createListGroupItem(this.fullName, this.email);

    listGroup.append(activeItem, this.linkProfile, this.logout);

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

  signOutClickListener(handler: () => void) {
    this.logout.addEventListener("click", () => {
      handler();
    });
  }

  render(): HTMLElement {
    return this.listGroup;
  }
}
