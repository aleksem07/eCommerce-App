import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";
import {
  Price as PriceResponse,
  Product as ProductResponse,
  ProductProjection as ProductProjectionResponse,
  Image as ImageResponse,
} from "@commercetools/platform-sdk";
import { Price, Product } from "./product.types";
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

  async filterProducts(
    filters: { size: string; color: string },
    priceRange: { minPrice: string; maxPrice: string },
    sort: string
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
                filters.size,
                filters.color,
                `variants.price.centAmount:range(${priceRange.minPrice} to ${priceRange.maxPrice})`,
              ],
              sort: sort ? [sort] : ["createdAt asc"],
            },
          })
          .execute();

        return body.results.map(this.mapProductProjectionResponseToProduct.bind(this));
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.errorOccurred, httpError);
    }
  }

  private mapProductProjectionResponseToProduct(
    productProjectionResponse: ProductProjectionResponse
  ) {
    return {
      id: productProjectionResponse.id,
      title: productProjectionResponse.name.en,
      description: productProjectionResponse.description?.en || "product description",
      images: this.mapProductImages(productProjectionResponse.masterVariant.images),
      price: this.getPrice(productProjectionResponse.masterVariant.prices),
      discountedPrice: this.getDiscountedPrice(productProjectionResponse.masterVariant.prices),
    };
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
}
