import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";
// import eventBusService from "@Services/event-bus/event-bus";
import { Category } from "./category.types";
import { Category as CategoryResponse } from "@commercetools/platform-sdk";
// import { HttpErrorType } from "@commercetools/sdk-client-v2";
// import { Events } from "@Services/event-bus/event-bus.types";

export default class CategoryService extends ClientBuilderService {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  async getAll() {
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
        const parentCategories: Category[] = [];
        const childrenCategories: Category[] = [];
        body.results.forEach((category) => {
          if (category.ancestors[0]) {
            childrenCategories.push(this.mapCategoryResponseToCategory(category));
          } else {
            parentCategories.push(this.mapCategoryResponseToCategory(category));
          }
        });

        return { parent: parentCategories, children: childrenCategories };
      }
    } catch (error) {
      // const httpError = error as HttpErrorType;
      // eventBusService.publish(Events.errorOccurred, httpError);
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
        const category: Category = this.mapCategoryResponseToCategory(body);

        return category;
      }
    } catch (error) {
      // const httpError = error as HttpErrorType;
      // eventBusService.publish(Events.errorOccurred, httpError);
    }
  }

  private mapCategoryResponseToCategory(productResponse: CategoryResponse): Category {
    return {
      ancestors: productResponse.ancestors,
      id: productResponse.id,
      name: productResponse.name.en,
    };
  }
}
