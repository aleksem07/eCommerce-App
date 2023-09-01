import UserMenuComponent from "@Components/user-menu/user-menu";
import UserProfileView from "./user-profile.view";
import UserDataComponent from "@Components/user-data/user-data";
import RouterService from "@Services/router/router";
import { NotificationVariant } from "@Components/notification/notification.types";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { Routes } from "@Services/router/router.types";
import { AUTH_TOKEN_LS } from "@Services/auth/auth.types";
import CustomerService from "@Services/customer/customer";

export default class UserProfilePage {
  private view: UserProfileView;
  private userMenu: UserMenuComponent;
  userData: UserDataComponent;
  customer: CustomerService;

  constructor() {
    this.view = new UserProfileView();
    this.userMenu = new UserMenuComponent();
    this.userData = new UserDataComponent();
    this.customer = new CustomerService();
  }

  private async checkCustomerExists() {
    const token = localStorage.getItem(AUTH_TOKEN_LS);

    if (!token) {
      RouterService.navigateTo(Routes.LOGIN);
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.info,
        message: "Please login first",
      });
    } else {
      const customer = await this.customer.getUserInfo();

      console.log(customer);

      // if (customer) {
      //   this.userData.init(customer);
      // } else {
      //   RouterService.navigateTo(Routes.NOT_FOUND);
      // }
    }
  }

  async init() {
    await this.checkCustomerExists();
    const userMenu = this.userMenu.init();
    const userData = this.userData.init();
    this.view.render(userMenu, userData);
  }
}
