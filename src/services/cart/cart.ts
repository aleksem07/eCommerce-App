import { NotificationVariant } from "@Components/notification/notification.types";
import AuthService from "@Services/auth/auth";
import { USERNAME_ID_LS } from "@Services/auth/auth.types";
import ClientBuilderService from "@Services/client-builder/client-builder";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { Cart, LINE_ITEMS_COUNT_LS } from "./cart.types";
import {
  Cart as CartResponse,
  Price as PriceResponse,
  Image as ImageResponse,
  LineItem as LineItemResponse,
  CentPrecisionMoney,
} from "@commercetools/platform-sdk";
import { HttpErrorType } from "@commercetools/sdk-client-v2";
import { ANON_CART_ID_LS, LineItem, USER_CART_ID_LS } from "./cart.types";
import { Price } from "@Services/product/product.types";

export default class CartService extends ClientBuilderService {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  async addToCart(productId: string): Promise<Cart | undefined> {
    const cart = await this.getCart();

    if (cart) {
      this.handleSuccess("Product has been added to cart");

      return await this.addProductToCart(cart.id, productId);
    }
  }

  async removeFromCart(lineItemId: string): Promise<Cart | undefined> {
    const cart = await this.getCart();

    if (cart) {
      this.handleSuccess("Product has been removed from cart");

      return await this.removeLineItemFromCart(cart.id, lineItemId);
    }
  }

  async removeAllFromCart() {
    const cart = await this.getCart();

    if (cart) {
      for (const item of cart.lineItems) {
        if (item) {
          await this.removeLineItemFromCart(cart.id, item.id);
        }
      }

      this.handleSuccess("All products removed from cart");

      return cart;
    }
  }

  private async createAnonCart() {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        const cart = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .carts()
          .post({
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: { currency: "USD" },
          })
          .execute();

        if (cart.body) {
          localStorage.setItem(ANON_CART_ID_LS, cart.body.id);
        }

        const result = this.mapCartResponseToCart(cart.body);
        this.saveLineItemsCount(result);
        eventBusService.publish(Events.updateCart);

        return result;
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  async checkUserCart(userId: string): Promise<Cart | undefined> {
    const anonCartId = localStorage.getItem(ANON_CART_ID_LS);
    const userCart = await this.getCartByCustomerID(userId);

    if (anonCartId && userCart) {
      return await this.cartToCartTransfer(anonCartId, userCart.id);
    }

    return userCart;
  }

  private async cartToCartTransfer(
    sourceCartId: string,
    targetCartId: string
  ): Promise<Cart | undefined> {
    const sourceCart = await this.getCartById(sourceCartId);
    const targetCart = await this.getCartById(targetCartId);

    if (sourceCart && targetCart) {
      for (const item of sourceCart.lineItems) {
        await this.addProductToCart(targetCartId, item.productId);
      }

      return await this.getCartById(targetCartId);
    }

    return sourceCart || targetCart;
  }

  private async addProductToCart(cartId: string, productId: string): Promise<Cart | undefined> {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        const cart = await this.getCartById(cartId);

        if (cart) {
          const { body } = await this.apiRoot
            .withProjectKey({ projectKey: this.projectKey })
            .carts()
            .withId({ ID: cartId })
            .post({
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: {
                version: cart.version,
                actions: [
                  {
                    action: "addLineItem",
                    productId,
                    variantId: 1,
                    quantity: 1,
                  },
                ],
              },
            })
            .execute();
          const result = this.mapCartResponseToCart(body);
          this.saveLineItemsCount(result);
          eventBusService.publish(Events.updateCart);

          return result;
        }
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private async removeLineItemFromCart(
    cartId: string,
    lineItemId: string
  ): Promise<Cart | undefined> {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        const cart = await this.getCartById(cartId);

        if (cart) {
          const { body } = await this.apiRoot
            .withProjectKey({ projectKey: this.projectKey })
            .carts()
            .withId({ ID: cartId })
            .post({
              headers: { Authorization: `Bearer ${token}` },
              body: {
                version: cart.version,
                actions: [
                  {
                    action: "removeLineItem",
                    lineItemId,
                  },
                ],
              },
            })
            .execute();
          const result = this.mapCartResponseToCart(body);
          this.saveLineItemsCount(result);
          eventBusService.publish(Events.updateCart);

          return result;
        }
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private async getCartByCustomerID(customerId: string) {
    const token = await this.authService.retrieveToken();
    try {
      if (token) {
        const cart = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .carts()
          .withCustomerId({ customerId })
          .get({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .execute();

        if (cart.body) {
          localStorage.setItem(USER_CART_ID_LS, cart.body.id);
        }

        const result = this.mapCartResponseToCart(cart.body);
        this.saveLineItemsCount(result);

        return result;
      }
    } catch (error) {
      const httpError = error as HttpErrorType;

      if (httpError.code === 404) {
        await this.createUserCart(customerId);
      }

      this.handleError(error);
    }
  }

  private async createUserCart(customerId: string) {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        const cart = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .carts()
          .post({
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: { currency: "USD", customerId },
          })
          .execute();

        if (cart) {
          localStorage.setItem(USER_CART_ID_LS, cart.body.id);
        }

        return this.mapCartResponseToCart(cart.body);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private async getCartById(cartId: string) {
    const token = await this.authService.retrieveToken();

    if (token) {
      try {
        const cart = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .carts()
          .withId({ ID: cartId })
          .get({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .execute();

        const result = this.mapCartResponseToCart(cart.body);
        this.saveLineItemsCount(result);

        return result;
      } catch (error) {
        this.handleError(error);
      }
    }
  }

  async getCart(): Promise<Cart | undefined> {
    const userId = localStorage.getItem(USERNAME_ID_LS);
    const anonCartId = localStorage.getItem(ANON_CART_ID_LS);

    if (userId) {
      return await this.checkUserCart(userId);
    }

    if (anonCartId) {
      return await this.getCartById(anonCartId);
    }

    return await this.createAnonCart();
  }

  private async saveLineItemsCount(cart?: Cart) {
    if (!cart) {
      localStorage.setItem(LINE_ITEMS_COUNT_LS, "0");
    } else {
      localStorage.setItem(LINE_ITEMS_COUNT_LS, cart.lineItems.length.toString());
    }
  }

  private mapCartResponseToCart(cartResponse: CartResponse): Cart {
    return {
      id: cartResponse.id,
      version: cartResponse.version,
      key: cartResponse.key || "",
      customerId: cartResponse.customerId || "",
      customerEmail: cartResponse.customerEmail || "",
      lineItems: cartResponse.lineItems.map(this.mapLineItemsResponseToLineItems.bind(this)) || [],
      totalPrice: this.getPriceFromCentPrecisionMoney(cartResponse.totalPrice),
    };
  }

  private mapLineItemsResponseToLineItems(lineItemsResponse: LineItemResponse): LineItem {
    return {
      id: lineItemsResponse.id,
      quantity: lineItemsResponse.quantity,
      productId: lineItemsResponse.productId,
      name: lineItemsResponse.name.en,
      price: this.getPrice(lineItemsResponse.price),
      discountedPrice: this.getDiscountedPrice(lineItemsResponse.price),
      totalPrice: this.getPriceFromCentPrecisionMoney(lineItemsResponse.totalPrice),
      images: this.mapProductImages(lineItemsResponse.variant.images),
    };
  }

  private getPrice(price?: PriceResponse): Price {
    const priceValue = this.getPriceValue(price?.value?.centAmount);

    return {
      currencyCode: price?.value?.currencyCode || "USD",
      value: Number(priceValue) || 0,
    };
  }

  private getPriceFromCentPrecisionMoney(money: CentPrecisionMoney): Price {
    const priceValue = this.getPriceValue(money.centAmount);

    return {
      currencyCode: money.currencyCode || "USD",
      value: Number(priceValue) || 0,
    };
  }

  private getPriceValue(centAmount?: number): number {
    return centAmount ? Number((centAmount / 100).toFixed(2)) : 0;
  }

  private getDiscountedPrice(price?: PriceResponse): Price | undefined {
    const priceValue = this.getPriceValue(price?.discounted?.value?.centAmount);

    if (!priceValue) {
      return;
    }

    return {
      currencyCode: price?.value?.currencyCode || "USD",
      value: Number(priceValue) || 0,
    };
  }

  private mapProductImages(images?: ImageResponse[]): string[] {
    return images?.map((image) => image.url) || [];
  }

  async updateListItemQuantity(cart: Cart, lineItemId: string, quantity: number) {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        const { body } = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .carts()
          .withId({ ID: cart.id })
          .post({
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: {
              version: cart.version,
              actions: [
                {
                  action: "changeLineItemQuantity",
                  lineItemId,
                  quantity,
                },
              ],
            },
          })
          .execute();

        const result = this.mapCartResponseToCart(body);
        this.saveLineItemsCount(result);
        eventBusService.publish(Events.updateCart);

        return result;
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown) {
    const httpError = error as HttpErrorType;
    eventBusService.publish(Events.showNotification, {
      variant: NotificationVariant.danger,
      message: httpError.message,
    });
  }

  private handleSuccess(message: string) {
    eventBusService.publish(Events.showNotification, {
      variant: NotificationVariant.success,
      message,
    });
  }
}
