import { NotificationVariant } from "@Components/notification/notification.types";
import AuthService from "@Services/auth/auth";
import { USERNAME_ID } from "@Services/auth/auth.types";
import ClientBuilderService from "@Services/client-builder/client-builder";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { Cart } from "@commercetools/platform-sdk";
import { ClientResponse, HttpErrorType } from "@commercetools/sdk-client-v2";
import { CART_ID } from "./cart.types";

export default class CartService extends ClientBuilderService {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  // eslint-disable-next-line max-lines-per-function
  async createCart() {
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
        console.log(cart);

        if (cart) {
          this.saveDataToLocalStorage(cart.body.id);
        }

        return cart;
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
    }
  }

  async updateCart(cartId: string, productId: string) {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .carts()
          .withId({ ID: cartId })
          .post({
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: {
              version: 1,
              actions: [
                {
                  action: "addLineItem",
                  productId,
                  variantId: 1,
                  quantity: 1,
                },
              ],
            },
          });
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
    }
  }

  private saveDataToLocalStorage(cartId: string) {
    if (cartId) {
      console.log(cartId);
      localStorage.setItem(CART_ID, cartId);
    }
  }
}
