import LoginPage from "@Pages/login/login";
import AppView from "./app.view";

export default class AppComponent {
  private view: AppView;
  private loginPage: LoginPage;

  constructor() {
    this.view = new AppView();
    this.loginPage = new LoginPage();
  }

  init() {
    this.view.render();
    this.loginPage.init();
  }
}
