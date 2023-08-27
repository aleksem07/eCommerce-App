import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";
import {
  Price as PriceResponse,
  ProductProjection as ProductResponse,
} from "@commercetools/platform-sdk";
import { Price } from "@Services/product/product.types";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { HttpErrorType } from "@commercetools/sdk-client-v2";

export default class ProductFilterService extends ClientBuilderService {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  async getFiltered(limit?: number) {
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
              limit,
              filter: [
                // 'variants.attributes.color.key:"gold", "blue"',
                // "variants.price.centAmount:range (* to 10000)",
                // 'variants.attributes.size:"M", "L"',
              ],
            },
          })
          .execute();

        return body.results.map(this.mapProductResponseToProduct.bind(this));
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.errorOccurred, httpError);
    }
  }

  private mapProductResponseToProduct(productResponse: ProductResponse) {
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
}
