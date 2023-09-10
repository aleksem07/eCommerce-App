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
    const cart = await this.getCart();

    if (cart) {
      this.handleSuccess("Product added to cart");

      return await this.addProductToCart(cart.id, productId);
    }
  }

  async removeFromCart(productId: string): Promise<Cart | undefined> {
    const cart = await this.getCart();

    if (cart) {
      this.handleSuccess("Product removed from cart");

      return await this.removeProductFromCart(cart.id, productId);
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
      this.handleError(error);
    }
  }

  async checkUserCart(userId: string): Promise<Cart | undefined> {
    const anonCartId = localStorage.getItem(ANON_CART_ID_LS);
    let cart = await this.getCartByCustomerID(userId);

    if (anonCartId) {
      cart = await this.cartToCartTransfer(anonCartId, userId);
    }

    return cart;
  }

  private async cartToCartTransfer(
    sourceCartId: string,
    targetCartId: string
  ): Promise<Cart | undefined> {
    const sourceCart = await this.getCartById(sourceCartId);
    const targetCart = await this.getCartById(targetCartId);
    let resultCart: Cart | undefined;

    if (sourceCart && targetCart) {
      sourceCart.lineItems.map(async (key) => {
        resultCart = await this.addProductToCart(targetCartId, key.productId);
      });

      return resultCart;
    }
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

          return this.mapCartResponseToCart(body);
        }
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private async removeProductFromCart(
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
              headers: {
                Authorization: `Bearer ${token}`,
              },
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

  private handleSuccess(message: string) {
    eventBusService.publish(Events.showNotification, {
      variant: NotificationVariant.success,
      message,
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

        return this.mapCartResponseToCart(cart.body);
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
      id: lineItemsResponse.id,
      quantity: lineItemsResponse.quantity,
      productId: lineItemsResponse.productId,
    };
  }
}
