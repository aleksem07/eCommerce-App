import RouterService from "@Services/router/router";
import AppView from "./app.view";
import LoginPage from "@Pages/login/login";
import MainPage from "@Pages/main/main";
import RegistrationPage from "@Pages/registration/registration";
import NotFoundPage from "@Pages/not-found/not-found";
import { Routes } from "@Services/router/router.types";
import HeaderComponent from "@Components/header/header";
import CatalogPage from "@Pages/catalog/catalog";
import ProductPage from "@Pages/product/product";
import UserProfilePage from "@Pages/user-profile/user-profile";
import eventBusService from "@Services/event-bus/event-bus";
import { EventData, Events } from "@Services/event-bus/event-bus.types";
import { HttpErrorType } from "@commercetools/sdk-client-v2";
import NotificationComponent from "@Components/notification/notification";

export default class AppComponent {
  private view: AppView;
  private router: RouterService;
  private header: HeaderComponent;
  private notification: NotificationComponent;

  constructor() {
    this.view = new AppView();
    this.view.render();
    this.header = new HeaderComponent();
    this.header.init();
    this.notification = new NotificationComponent();

    this.router = RouterService.getInstance(this.view.element, {
      [Routes.MAIN]: new MainPage(),
      [Routes.LOGIN]: new LoginPage(),
      [Routes.REGISTRATION]: new RegistrationPage(),
      [Routes.NOT_FOUND]: new NotFoundPage(),
      [Routes.CATALOG]: new CatalogPage(),
      [Routes.PRODUCT]: new ProductPage(),
      [Routes.USER_PROFILE]: new UserProfilePage(),
    });

    eventBusService.subscribe(Events.errorOccurred, this.errorHandler.bind(this));
  }

  errorHandler(error?: EventData) {
    const httpError = error as HttpErrorType;
    this.notification.init("danger", httpError.message);
  }
}
