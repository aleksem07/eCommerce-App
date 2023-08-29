import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";
import {
  Price as PriceResponse,
  Product as ProductResponse,
  ProductProjection as ProductProjectionResponse,
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
    return {
      id: productResponse.id,
      title: productResponse.masterData.current.name.en,
      description: productResponse.masterData.current.description?.en || "product description",
      imageUrl: productResponse.masterData.current.masterVariant.images?.[0].url || "",
      color: productResponse.masterData.current.masterVariant.attributes?.[8].value.key,
      size: productResponse.masterData.current.masterVariant.attributes?.[7].value,
      price: this.getPrice(productResponse.masterData.current.masterVariant.prices),
      discountedPrice: this.getDiscountedPrice(
        productResponse.masterData.current.masterVariant.prices
      ),
    };
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

  // eslint-disable-next-line max-lines-per-function
  async filterProducts(size: string, color: string) {
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
              // facet: [
              //   "variants.attributes.size counting products",
              //   "variants.attributes.color.key counting products",
              //   "variants.price.centAmount counting products",
              // ],
              // "filter.query": [
              //   'variants.attributes.size:"L"',
              //   'variants.attributes.color.key:"gold"',
              // ],
              // limit,
              filter: [
                // 'categories.id:subtree("0580853f-c6c1-4b5a-8a1a-0cf545a29949")',
                size,
                color,
                // 'variants.attributes.size:"1.8m", "2.0m"',
                // 'variants.attributes.color.key:"gold", "blue"',
                "variants.price.centAmount:range(0 to *)",
              ],
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

  private mapProductProjectionResponseToProduct(productResponse: ProductProjectionResponse) {
    return {
      id: productResponse.id,
      title: productResponse.name.en,
      description: productResponse.description?.en || "product description",
      imageUrl: productResponse.masterVariant.images?.[0].url || "",
      color: productResponse.masterVariant.attributes?.[8].value.key,
      size: productResponse.masterVariant.attributes?.[7].value,
      price: this.getPrice(productResponse.masterVariant.prices),
      discountedPrice: this.getDiscountedPrice(productResponse.masterVariant.prices),
    };
  }
}
