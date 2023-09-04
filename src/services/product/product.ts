import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";
import {
  Price as PriceResponse,
  Product as ProductResponse,
  Image as ImageResponse,
  ProductProjection,
} from "@commercetools/platform-sdk";
import { Price, Product, ProductFilters, PriceRange } from "./product.types";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { HttpErrorType } from "@commercetools/sdk-client-v2";
import { NotificationVariant } from "@Components/notification/notification.types";

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

        return body.results.map(this.mapProductResponseToProduct.bind(this));
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
    }
  }

  async getById(id: string): Promise<Product | undefined> {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        const { body } = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .products()
          .withId({ ID: id })
          .get({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .execute();

        return this.mapProductResponseToProduct(body);
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
    }
  }

  async getProductsByCategory(categoryId: string) {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        const result = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .productProjections()
          .search()
          .get({
            headers: {
              Authorization: `Bearer ${token}`,
            },
            queryArgs: {
              filter: [`categories.id:"${categoryId}"`],
              sort: ["createdAt asc"],
            },
          })
          .execute();

        return result.body.results.map((res) => this.mapProductProjectionToProduct(res));
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
    }
  }

  private mapProductProjectionToProduct(productProjection: ProductProjection): Product {
    const attributes = productProjection.masterVariant.attributes;

    const size = attributes?.find((attribute) => attribute.name === "size")?.value || "";
    const color = attributes?.find((attribute) => attribute.name === "color")?.value?.key || "";

    return {
      id: productProjection.id,
      title: productProjection.name.en,
      description: productProjection.description?.en || "product description",
      images: this.mapProductImages(productProjection.masterVariant.images),
      price: this.getPrice(productProjection.masterVariant.prices),
      discountedPrice: this.getDiscountedPrice(productProjection.masterVariant.prices),
      color,
      size,
    };
  }

  private mapProductResponseToProduct(productResponse: ProductResponse): Product {
    const attributes = productResponse.masterData.current.masterVariant.attributes;

    const size = attributes?.find((attribute) => attribute.name === "size")?.value || "";
    const color = attributes?.find((attribute) => attribute.name === "color")?.value?.key || "";

    return {
      id: productResponse.id,
      title: productResponse.masterData.current.name.en,
      description: productResponse.masterData.current.description?.en || "product description",
      images: this.mapProductImages(productResponse.masterData.current.masterVariant.images),
      color,
      size,
      price: this.getPrice(productResponse.masterData.current.masterVariant.prices),
      discountedPrice: this.getDiscountedPrice(
        productResponse.masterData.current.masterVariant.prices
      ),
    };
  }

  private mapProductImages(images?: ImageResponse[]): string[] {
    return images?.map((image) => image.url) || [];
  }

  private getPrice(prices?: PriceResponse[]): Price {
    const price = prices?.find((price) => price.country === "US");
    const priceValue = this.getPriceValue(price?.value?.centAmount);

    return {
      currencyCode: price?.value?.currencyCode || "USD",
      value: Number(priceValue) || 0,
    };
  }

  private getDiscountedPrice(prices?: PriceResponse[]): Price | undefined {
    const price = prices?.find((price) => price.country === "US");
    const priceValue = this.getPriceValue(price?.discounted?.value?.centAmount);

    if (!priceValue) {
      return;
    }

    return {
      currencyCode: price?.value?.currencyCode || "USD",
      value: Number(priceValue) || 0,
    };
  }

  private getPriceValue(centAmount?: number): number {
    return centAmount ? Number((centAmount / 100).toFixed(2)) : 0;
  }

  // eslint-disable-next-line max-params
  async filterProducts(
    filters: ProductFilters,
    priceRange: PriceRange,
    sort: string,
    categoryId?: string
  ) {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        const { body } = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .productProjections()
          .search()
          .get({
            headers: {
              Authorization: `Bearer ${token}`,
            },
            queryArgs: {
              filter: [
                `categories.id:"${categoryId}"`,
                filters.size,
                filters.color,
                `variants.price.centAmount:range(${priceRange.minPrice} to ${priceRange.maxPrice})`,
              ],
              sort: sort ? [sort] : ["createdAt asc"],
            },
          })
          .execute();

        return body.results.map(this.mapProductProjectionToProduct.bind(this));
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
    }
  }

  public generateFilters(
    size: string[],
    color: string[]
  ): { sizeFilter: string; colorFilter: string } {
    const formatArray = (arr: string[]) => arr.map((item) => `"${item.trim()}"`).join(", ");
    const filters = { sizeFilter: "", colorFilter: "" };

    filters.sizeFilter =
      size && size.length > 0 ? `variants.attributes.size:${formatArray(size)}` : "";
    filters.colorFilter =
      color && color.length > 0 ? `variants.attributes.color.key:${formatArray(color)}` : "";

    return filters;
  }

  async searchProducts(search: string) {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        const { body } = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .productProjections()
          .search()
          .get({
            headers: {
              Authorization: `Bearer ${token}`,
            },
            queryArgs: {
              "text.en": search,
              fuzzy: true,
              sort: ["name.en asc"],
            },
          })
          .execute();

        return body.results.map(this.mapProductProjectionToProduct.bind(this));
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
    }
  }
}
