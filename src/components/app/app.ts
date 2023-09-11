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
import NotificationComponent from "@Components/notification/notification";
import { NotificationVariant } from "@Components/notification/notification.types";
import ObjectGuardUtil from "@Utils/object-guard/object-guard";
import CategoryNavigationComponent from "@Components/category-navigation/category-navigation";
import SearchProductsPage from "@Pages/search-products/search-products";
import CartPage from "@Pages/cart/cart";
import AboutUsPage from "@Pages/about-us/about-us";
import FooterComponent from "@Components/footer/footer";

export default class AppComponent {
  private view: AppView;
  private router: RouterService;
  private header: HeaderComponent;
  private notification: NotificationComponent;
  private categoryNavigation: CategoryNavigationComponent;
  private footer: FooterComponent;

  constructor() {
    this.view = new AppView();
    this.view.render();
    this.header = new HeaderComponent();
    this.header.init();
    this.notification = new NotificationComponent();
    this.categoryNavigation = new CategoryNavigationComponent();
    this.categoryNavigation.init();
    this.footer = new FooterComponent();
    this.footer.init();

    this.router = RouterService.getInstance(this.view.element, {
      [Routes.MAIN]: new MainPage(),
      [Routes.LOGIN]: new LoginPage(),
      [Routes.REGISTRATION]: new RegistrationPage(),
      [Routes.NOT_FOUND]: new NotFoundPage(),
      [Routes.CATALOG]: new CatalogPage(),
      [Routes.PRODUCT]: new ProductPage(),
      [Routes.USER_PROFILE]: new UserProfilePage(),
      [Routes.SEARCH]: new SearchProductsPage(),
      [Routes.CART]: new CartPage(),
      [Routes.ABOUT_US]: new AboutUsPage(),
    });

    eventBusService.subscribe(Events.showNotification, this.notificationHandler.bind(this));
  }

  notificationHandler(data?: EventData) {
    const hasVariant = ObjectGuardUtil.hasProp<NotificationVariant>(data, "variant");
    const hasMessage = ObjectGuardUtil.hasProp<string>(data, "message");

    if (hasVariant && hasMessage) {
      this.notification.init(data.variant, data.message);
    }
  }
}
