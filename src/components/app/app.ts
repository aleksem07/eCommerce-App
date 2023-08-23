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

export default class AppComponent {
  private view: AppView;
  private router: RouterService;
  private header: HeaderComponent;

  constructor() {
    this.view = new AppView();
    this.view.render();
    this.header = new HeaderComponent();
    this.header.init();

    this.router = RouterService.getInstance(this.view.element, {
      [Routes.MAIN]: new MainPage(),
      [Routes.LOGIN]: new LoginPage(),
      [Routes.REGISTRATION]: new RegistrationPage(),
      [Routes.NOT_FOUND]: new NotFoundPage(),
      [Routes.CATALOG]: new CatalogPage(),
      [Routes.PRODUCT]: new ProductPage(),
      [Routes.USER_PROFILE]: new UserProfilePage(),
    });
  }
}
