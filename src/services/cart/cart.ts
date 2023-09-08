import { NotificationVariant } from "@Components/notification/notification.types";
import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { Cart as CartResponse, Product as ProductResponse } from "@commercetools/platform-sdk";
import { HttpErrorType } from "@commercetools/sdk-client-v2";
import { Cart } from "./cart.types";

export default class CartService extends ClientBuilderService {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  async createCart(): Promise<Cart | undefined> {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        const { body } = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .carts()
          .post({
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: {
              lineItems: [],
              currency: "USD",
            },
          })
          .execute();

        return this.mapCartResponse(body);
      }
    } catch (error) {
      this.handleError(error as HttpErrorType);
    }
  }

  async getCart(): Promise<Cart | undefined> {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        const { body } = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .carts()
          .withId({ ID: this.clientID })
          .get({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .execute();

        // If the cart is not found, create one.
        if (!body || Object.keys(body).length === 0) {
          return this.createCart();
        }

        return this.mapCartResponse(body);
      }
    } catch (error) {
      this.handleError(error as HttpErrorType);
    }
  }

  private handleError(error: HttpErrorType) {
    const httpError = error;
    eventBusService.publish(Events.showNotification, {
      variant: NotificationVariant.danger,
      message: httpError.message,
    });
  }

  private mapCartResponse(cartResponse: CartResponse): Cart {
    return {
      id: cartResponse.id,
      version: cartResponse.version,
      key: cartResponse.key || "",
      customerId: cartResponse.customerId || "",
      customerEmail: cartResponse.customerEmail || "",
      lineItems: cartResponse.lineItems || [],
      totalPrice: cartResponse.totalPrice,
    };
  }
}
