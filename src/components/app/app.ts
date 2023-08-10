import RouterService from "@Services/router/router";
import AppView from "./app.view";
import LoginPage from "@Pages/login/login";
import MainPage from "@Pages/main/main";
import RegistrationPage from "@Pages/registration/registration";
import NotFoundPage from "@Pages/not-found/not-found";

export default class AppComponent {
  private view: AppView;
  private router: RouterService;

  constructor() {
    this.view = new AppView();
    this.view.render();

    this.router = new RouterService(this.view.element, {
      main: new MainPage(),
      login: new LoginPage(),
      registration: new RegistrationPage(),
      "404": new NotFoundPage(),
    });
  }
}
