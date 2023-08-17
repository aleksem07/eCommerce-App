import { ViewBuilder } from "@Interfaces/view-builder";
import MainNavComponent from "@Components/main-nav/main-nav";

export default class MainView extends ViewBuilder {
  container: HTMLElement;
  component: MainNavComponent;
  mainNavComponent: HTMLUListElement;
  constructor() {
    super();
    this.container = this.createElement("div", {
      id: "main",
      classes: ["container"],
    });
    this.component = new MainNavComponent();
    this.mainNavComponent = this.component.init();

    this.container.append(this.mainNavComponent);
  }

  render() {
    this.appendTo("#root", this.container);
  }
}
