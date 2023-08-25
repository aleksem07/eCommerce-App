import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";
import { Price as PriceResponse, Product as ProductResponse } from "@commercetools/platform-sdk";
import { Price, Product } from "./product.types";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { HttpErrorType } from "@commercetools/sdk-client-v2";

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
      eventBusService.publish(Events.errorOccurred, httpError);
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
}
