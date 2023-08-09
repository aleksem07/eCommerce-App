import RouterService from "@Services/router/router";
import AppView from "./app.view";
import LoginPage from "@Pages/login/login";
import MainPage from "@Pages/main/main";
import RegistrationPage from "@Pages/registration/registration";

export default class AppComponent {
  private view: AppView;
  private router: RouterService;

  constructor() {
    this.view = new AppView();
    this.router = new RouterService(this.view.element, {
      "/": new MainPage(),
      "/login": new LoginPage(),
      "/register": new RegistrationPage(),
    });
  }

  init() {
    this.view.render();
    this.router.navigateTo("/");
  }
}
