import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";
import { Product as ProductResponse } from "@commercetools/platform-sdk";
import { Product } from "./product.types";

export default class ProductService extends ClientBuilderService {
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
          .products()
          .get({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .execute();

        return body.results.map(this.mapProductResponseToProduct);
      }
    } catch (error) {
      console.error("ERRORRRR", error);
    }
  }

  private mapProductResponseToProduct(productResponse: ProductResponse): Product {
    return {
      title: productResponse.masterData.current.name.en,
      description: productResponse.masterData.current.description?.en || "product description",
      imageUrl: productResponse.masterData.current.masterVariant.images?.[0].url || "",
      color: productResponse.masterData.current.masterVariant.attributes?.[8].value.key,
      size: productResponse.masterData.current.masterVariant.attributes?.[7].value,
    };
  }
}
