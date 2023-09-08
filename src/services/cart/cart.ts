/* eslint-disable max-lines-per-function */
import { NotificationVariant } from "@Components/notification/notification.types";
import AuthService from "@Services/auth/auth";
import { USERNAME_ID } from "@Services/auth/auth.types";
import ClientBuilderService from "@Services/client-builder/client-builder";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { Cart } from "@commercetools/platform-sdk";
import { ClientResponse, HttpErrorType } from "@commercetools/sdk-client-v2";
import { CART_ID } from "./cart.types";
import ProductService from "@Services/product/product";

export default class CartService extends ClientBuilderService {
  private authService: AuthService;
  private productService: ProductService;
  private cart?: Cart;

  constructor() {
    super();
    this.productService = new ProductService();
    this.authService = new AuthService();
  }

  addToCart(productId: string) {
    let cartId = localStorage.getItem(CART_ID);
    const userId = localStorage.getItem(USERNAME_ID);

    if (!cartId && !userId) {
      this.createAnonCart();
      cartId = localStorage.getItem(CART_ID);
    }

    if (cartId) {
      this.updateCart(cartId, productId);
      console.log(" add to cart cartId", cartId);
    }
  }

  // eslint-disable-next-line max-lines-per-function
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

  async createUserCart(userId: string) {
    const userCart = await this.getCartByCustomerID(userId);
    const anonCartId = localStorage.getItem(CART_ID);
    let anonCart;

    if (!userCart) {
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
              body: { currency: "USD", customerId: userId },
            })
            .execute();
          console.log("crate new user cart", cart);

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

      if (anonCartId) {
        anonCart = await this.getCartById(anonCartId);
        const cartId = localStorage.getItem(CART_ID);

        if (anonCart && cartId) {
          anonCart.lineItems.map((key) => {
            this.updateCart(cartId, key.productId);
          });
        }
      }
    }
  }

  private async updateCart(cartId: string, productId: string) {
    console.log("update cart");
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        // const product = await this.productService.getById(productId);
        const cart = await this.getCartById(cartId);
        console.log("update cart after get cart", cart);

        if (cart) {
          console.log("cart version", cart.version);
          const productResponce = await this.apiRoot
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
          this.cart = productResponce.body;
          console.log("add product to cart", productResponce);
        }
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
    }
  }

  async getCartByCustomerID(customerId: string) {
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
        console.log("cart with customer id", cart.body);

        if (cart.body) {
          this.saveDataToLocalStorage(cart.body.id);
        }

        return cart.body;
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
    }
  }

  async getCartById(cartId: string) {
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
        console.log("cart with cart id", cart.body);

        this.cart = cart.body;

        return cart.body;
      } catch (error) {
        const httpError = error as HttpErrorType;
      }
    }
  }

  private saveDataToLocalStorage(cartId: string) {
    if (cartId) {
      console.log("save thisid ", cartId);
      localStorage.setItem(CART_ID, cartId);
    }
  }
}
