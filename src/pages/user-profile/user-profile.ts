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
import { Customer } from "@Services/customer/customer.types";

export default class UserProfilePage {
  private view: UserProfileView;
  private userMenu!: UserMenuComponent;
  private userData!: UserDataComponent;
  private customerService: CustomerService;
  private customer?: Customer;

  constructor() {
    this.view = new UserProfileView();
    this.customerService = new CustomerService();
  }

  private async checkCustomerExists() {
    const token = localStorage.getItem(AUTH_TOKEN_LS);

    if (!token) {
      this.redirectToLogin();
    } else {
      const customer = await this.customerService.getUserInfo();

      if (customer) {
        this.customer = customer;
      } else {
        this.redirectToLogin();
      }
    }
  }

  private redirectToLogin() {
    RouterService.navigateTo(Routes.LOGIN);
    eventBusService.publish(Events.showNotification, {
      variant: NotificationVariant.info,
      message: "Please login first",
    });
  }

  async init() {
    await this.checkCustomerExists();

    if (this.customer) {
      const fullName = `${this.customer.firstName} ${this.customer.lastName}`;
      this.userMenu = new UserMenuComponent(fullName, this.customer.email);
      this.userData = new UserDataComponent(this.customer);

      const userMenu = this.userMenu.init();
      const userData = this.userData.init();
      this.view.render(userMenu, userData);
    }
  }
}
