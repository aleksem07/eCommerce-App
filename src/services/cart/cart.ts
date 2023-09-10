import { NotificationVariant } from "@Components/notification/notification.types";
import AuthService from "@Services/auth/auth";
import { USERNAME_ID_LS } from "@Services/auth/auth.types";
import ClientBuilderService from "@Services/client-builder/client-builder";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { Cart } from "./cart.types";
import { Cart as CartResponse } from "@commercetools/platform-sdk";
import { LineItem as LineItemResponse } from "@commercetools/platform-sdk";
import { HttpErrorType } from "@commercetools/sdk-client-v2";
import { ANON_CART_ID_LS, LineItem, USER_CART_ID_LS } from "./cart.types";

export default class CartService extends ClientBuilderService {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  async addToCart(productId: string): Promise<Cart | undefined> {
    let anonCartId = localStorage.getItem(ANON_CART_ID_LS);
    const userId = localStorage.getItem(USERNAME_ID_LS);

    if (!anonCartId && !userId) {
      await this.createAnonCart();
      anonCartId = localStorage.getItem(ANON_CART_ID_LS);
    } else if (!anonCartId && userId) {
      await this.checkUserCart(userId);
    }
    const userCartId = localStorage.getItem(USER_CART_ID_LS);

    if (userCartId) {
      return await this.updateCart(userCartId, productId);
    } else if (anonCartId) {
      return await this.updateCart(anonCartId, productId);
    }
  }

  async createAnonCart() {
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

        if (cart) {
          localStorage.setItem(ANON_CART_ID_LS, cart.body.id);
        }

        return this.mapCartResponseToCart(cart.body);
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
    }
  }

  async checkUserCart(userId: string) {
    const anonCartId = localStorage.getItem(ANON_CART_ID_LS);
    await this.getCartByCustomerID(userId);

    if (anonCartId) {
      this.cartToCartTransfer(anonCartId, userId);
    }
  }

  private async cartToCartTransfer(sourceCart: string, targetCart: string) {
    const originalCart = await this.getCartById(sourceCart);
    const endingCart = await this.getCartById(targetCart);

    if (originalCart && endingCart) {
      originalCart.lineItems.map((key) => {
        this.updateCart(targetCart, key.productId);
      });
    }
  }

  private async updateCart(cartId: string, productId: string): Promise<Cart | undefined> {
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

          return this.mapCartResponseToCart(body);
        }
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

        return this.mapCartResponseToCart(cart.body);
      }
    } catch (error) {
      const httpError = error as HttpErrorType;

      if (httpError.code === 404) {
        await this.createUserCart(customerId);
      }

      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
      this.createUserCart(customerId);
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
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
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

        return this.mapCartResponseToCart(cart.body);
      } catch (error) {
        const httpError = error as HttpErrorType;
        eventBusService.publish(Events.showNotification, {
          variant: NotificationVariant.danger,
          message: httpError.message,
        });
      }
    }
  }

  async getCart(): Promise<Cart | undefined> {
    const userId = localStorage.getItem(USERNAME_ID_LS);
    const anonCartId = localStorage.getItem(ANON_CART_ID_LS);

    if (userId) {
      return await this.getCartByCustomerID(userId);
    }

    if (anonCartId) {
      return await this.getCartById(anonCartId);
    }

    return await this.createAnonCart();
  }

  private mapCartResponseToCart(cartResponse: CartResponse): Cart {
    return {
      id: cartResponse.id,
      version: cartResponse.version,
      key: cartResponse.key || "",
      customerId: cartResponse.customerId || "",
      customerEmail: cartResponse.customerEmail || "",
      lineItems: cartResponse.lineItems.map(this.mapLineItemsResponseToLineItems.bind(this)) || [],
      totalPrice: cartResponse.totalPrice,
    };
  }

  private mapLineItemsResponseToLineItems(lineItemsResponse: LineItemResponse): LineItem {
    return {
      quantity: lineItemsResponse.quantity,
      productId: lineItemsResponse.productId,
    };
  }
}
