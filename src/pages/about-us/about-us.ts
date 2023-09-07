import AboutUsView from "./about-us.view";

export default class AboutUsPage {
  private view: AboutUsView;

  constructor() {
    this.view = new AboutUsView();
  }

  init() {
    this.view.render();
  }
}
