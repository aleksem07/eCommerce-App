import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";
// import eventBusService from "@Services/event-bus/event-bus";
import { Category } from "@commercetools/platform-sdk";
import { Category as CategoryResponse } from "@commercetools/platform-sdk";
// import { HttpErrorType } from "@commercetools/sdk-client-v2";
// import { Events } from "@Services/event-bus/event-bus.types";

export default class CategoriesService extends ClientBuilderService {
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
            childrenCategories.push(this.mapProductResponseToProduct(category));
          } else {
            parentCategories.push(this.mapProductResponseToProduct(category));
          }
        });

        return { parent: parentCategories, children: childrenCategories };
      }
    } catch (error) {
      // const httpError = error as HttpErrorType;
      // eventBusService.publish(Events.errorOccurred, httpError);
    }
  }

  private mapProductResponseToProduct(productResponse: CategoryResponse): Category {
    return {
      version: productResponse.version,
      createdAt: productResponse.createdAt,
      lastModifiedAt: productResponse.lastModifiedAt,
      slug: productResponse.slug,
      ancestors: productResponse.ancestors,
      orderHint: productResponse.orderHint,
      id: productResponse.id,
      name: productResponse.name,
    };
  }
}
