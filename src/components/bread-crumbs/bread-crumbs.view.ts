import { ViewBuilder } from "@Interfaces/view-builder";
import CategoryService from "@Services/category/category";
import { Category } from "@Services/category/category.types";
import { Routes } from "@Services/router/router.types";

export default class BreadCrumbsView extends ViewBuilder {
  private element: HTMLElement;
  private breadCrumbList: HTMLUListElement;

  constructor() {
    super();
    this.element = this.createElement("nav", { classes: ["container"] });
    this.element.setAttribute("aria-label", "breadcrumb");
    this.breadCrumbList = this.createElement("ol", {
      classes: ["breadcrumb"],
    });
    this.element.append(this.breadCrumbList);
  }

  createBreadCrumb(category: { id: string; name: string }, isActive = false) {
    const breadCrumbItem = this.createElement("li", {
      classes: ["breadcrumb-item"],
    });
    const breadCrumbLink: HTMLLinkElement = this.createElement("a");
    const url = new URL(`${window.location.origin}${Routes.CATALOG}-${category.id}`);
    breadCrumbLink.href = url.href;
    breadCrumbLink.textContent = category.name;
    breadCrumbItem.append(breadCrumbLink);

    if (isActive) {
      breadCrumbItem.classList.add("active");
    }

    return breadCrumbItem;
  }

  createBreadCrumbs(breadCrumbs: { id: string; name: string }[]) {
    const breadcrumbList: HTMLElement[] = [];
    for (let i = 0, len = breadCrumbs.length; i < len; i++) {
      if (i === len - 1) {
        breadcrumbList.push(this.createBreadCrumb(breadCrumbs[i], true));
      } else {
        breadcrumbList.push(this.createBreadCrumb(breadCrumbs[i]));
      }
    }

    return breadcrumbList;
  }

  buildBreadcrumbs(
    categories: Category[],
    catId: string,
    breadcrumb: { id: string; name: string }[] = []
  ): { id: string; name: string }[] | null {
    for (const category of categories) {
      breadcrumb.push({ id: category.id, name: category.name });

      if (category.id === catId) {
        // Found the desired category, stop and return the breadcrumb
        return breadcrumb;
      }

      if (category.children && category.children.length > 0) {
        const childBreadcrumb = this.buildBreadcrumbs(category.children, catId, [...breadcrumb]);

        if (childBreadcrumb) {
          // Found the category in the child hierarchy, return the breadcrumb
          return childBreadcrumb;
        }
      }

      // Category not found in this branch, remove it from the breadcrumb
      breadcrumb.pop();
    }

    // Category not found anywhere in the hierarchy
    return null;
  }

  async render(categories?: Category[]) {
    this.breadCrumbList.innerHTML = "";
    console.log(categories);

    if (categories) {
      const [, ...rest] = window.location.href.split("-");
      const currentCategoryId = rest.join("-");
      const breadcrumb = this.buildBreadcrumbs(categories, currentCategoryId);

      if (breadcrumb) {
        const thisBreadCrumbList = this.createBreadCrumbs(breadcrumb);
        this.breadCrumbList.append(...thisBreadCrumbList);
        this.element.append(this.breadCrumbList);
      }
    }
    const root = this.getElement("#root");
    root.prepend(this.element);
  }
}
