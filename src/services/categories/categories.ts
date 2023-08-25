import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";
import { Category } from "@commercetools/platform-sdk";
import { Category as CategoryResponse } from "@commercetools/platform-sdk";

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

        return body.results.map(this.mapProductResponseToProduct);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("ERRORRRR", error);
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
