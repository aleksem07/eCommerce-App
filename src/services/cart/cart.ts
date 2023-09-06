import { NotificationVariant } from "@Components/notification/notification.types";
import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { HttpErrorType } from "@commercetools/sdk-client-v2";

export default class CartService extends ClientBuilderService {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  async getAll() {
    // const categories = localStorage.getItem(SETTINGS_KEY);
    // let cart;

    // if (!categories) {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        const { body } = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .categories()
          .get({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .execute();
        // const categories = this.buildCategoryStructure(body.results);
        // localStorage.setItem(SETTINGS_KEY, JSON.stringify(categories));

        return body;
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
    }
    // } else {
    //   return JSON.parse(categories);
    // }
  }
}
