import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";
import eventBusService from "@Services/event-bus/event-bus";
import { Category } from "./category.types";
import { Category as CategoryResponse } from "@commercetools/platform-sdk";
import { HttpErrorType } from "@commercetools/sdk-client-v2";
import { Events } from "@Services/event-bus/event-bus.types";
import { NotificationVariant } from "@Components/notification/notification.types";

export default class CategoryService extends ClientBuilderService {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  async getAll() {
    const categories = localStorage.getItem("categories");

    if (!categories) {
      try {
        const token = await this.authService.retrieveToken();

        if (token) {
          const { body } = await this.apiRoot
            .withProjectKey({ projectKey: this.projectKey })
            .categories()
            .get({
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .execute();
          const categories = this.buildCategoryStructure(body.results);
          localStorage.setItem("categories", JSON.stringify(categories));

          return categories;
        }
      } catch (error) {
        const httpError = error as HttpErrorType;
        eventBusService.publish(Events.showNotification, {
          variant: NotificationVariant.danger,
          message: httpError.message,
        });
      }
    } else {
      return JSON.parse(categories);
    }
  }

  async getCategory(id: string) {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        const { body } = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .categories()
          .withId({ ID: id })
          .get({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .execute();

        const category = this.buildCategoryStructure([body]);

        return category;
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.errorOccurred, httpError);
    }
  }

  private buildCategoryStructure(categories: CategoryResponse[]): Category[] {
    const categoryMap = new Map();

    categories.forEach((category) => {
      categoryMap.set(category.id, {
        id: category.id,
        name: category.name.en,
        children: [],
      });
    });

    const rootCategories: Category[] = [];

    categories.forEach((category) => {
      if (category.ancestors.length === 0) {
        rootCategories.push(categoryMap.get(category.id));
      } else {
        const parentCategory = categoryMap.get(category.ancestors[0].id);
        parentCategory.children.push(categoryMap.get(category.id));
      }
    });
    console.log(rootCategories);

    return rootCategories;
  }

  // private mapCategoryResponseToCategory(productResponse: CategoryResponse): Category {
  //   return {
  //     ancestors: productResponse.ancestors,
  //     id: productResponse.id,
  //     name: productResponse.name.en,
  //   };
  // }
}
