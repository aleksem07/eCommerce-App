import { ViewBuilder } from "@Interfaces/view-builder";
import { Category } from "@Services/category/category.types";
import { Routes } from "@Services/router/router.types";
import { BreadCrumbsProps } from "./bread-crumbs.types";

export default class BreadCrumbsView extends ViewBuilder {
  private element: HTMLElement;
  private breadCrumbList: HTMLUListElement;

  constructor() {
    super();
    this.element = this.createElement("nav", { classes: ["container", "pt-4"] });
    this.element.setAttribute("aria-label", "breadcrumb");
    this.breadCrumbList = this.createElement("ol", {
      classes: ["breadcrumb"],
    });
    this.element.append(this.breadCrumbList);
  }

  private createBreadCrumbListItem(category: { id: string; name: string }, isActive = false) {
    const breadCrumbItem = this.createElement("li", {
      classes: ["breadcrumb-item"],
    });
    breadCrumbItem.setAttribute("aria-current", "page");

    if (isActive) {
      breadCrumbItem.classList.add("active");
      breadCrumbItem.textContent = category.name;
    } else {
      const breadCrumbLink: HTMLLinkElement = this.createElement("a");
      const url = new URL(`${window.location.origin}${Routes.CATALOG}-${category.id}`);
      breadCrumbLink.href = url.href;
      breadCrumbLink.textContent = category.name;
      breadCrumbItem.append(breadCrumbLink);
    }

    return breadCrumbItem;
  }

  private createBreadCrumbsList(breadCrumbs: BreadCrumbsProps[]) {
    const breadcrumbList: HTMLElement[] = [];
    for (let i = 0, len = breadCrumbs.length; i < len; i++) {
      if (i === len - 1) {
        breadcrumbList.push(this.createBreadCrumbListItem(breadCrumbs[i], true));
      } else {
        breadcrumbList.push(this.createBreadCrumbListItem(breadCrumbs[i]));
      }
    }

    return breadcrumbList;
  }

  private buildBreadcrumbs(
    categories: Category[],
    catId: string,
    breadcrumb: BreadCrumbsProps[] = []
  ): BreadCrumbsProps[] | null {
    for (const category of categories) {
      breadcrumb.push({ id: category.id, name: category.name });

      if (category.id === catId) {
        return breadcrumb;
      }

      if (category.children && category.children.length > 0) {
        const childBreadcrumb = this.buildBreadcrumbs(category.children, catId, [...breadcrumb]);

        if (childBreadcrumb) {
          return childBreadcrumb;
        }
      }

      breadcrumb.pop();
    }

    return null;
  }

  async render(categories?: Category[]) {
    this.breadCrumbList.innerHTML = "";

    if (categories) {
      const [, ...rest] = window.location.href.split("-");
      const currentCategoryId = rest.join("-");
      const breadcrumb = this.buildBreadcrumbs(categories, currentCategoryId);

      if (breadcrumb) {
        const thisBreadCrumbList = this.createBreadCrumbsList(breadcrumb);
        this.breadCrumbList.append(...thisBreadCrumbList);
        this.element.append(this.breadCrumbList);
      }
    }
    const root = this.getElement("#root");
    root.prepend(this.element);
  }
}
