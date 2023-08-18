import { ViewBuilder } from "@Interfaces/view-builder";
import MainNavComponent from "@Components/main-nav/main-nav";

export default class MainView extends ViewBuilder {
  container: HTMLElement;
  headiang: HTMLHeadingElement;
  component: MainNavComponent;
  mainNavComponent: HTMLUListElement;
  constructor() {
    super();
    this.container = this.createElement("div", {
      id: "main",
      classes: ["container"],
    });
    this.headiang = this.createElement("h1", {
      id: "main-heading",
      classes: ["h3", "mb-3", "fw-normal", "text-center", "py-5"],
    });
    this.headiang.textContent = "Main Page";
    this.component = new MainNavComponent();
    this.mainNavComponent = this.component.init();

    this.container.append(this.headiang, this.mainNavComponent);
  }

  render() {
    this.appendTo("#root", this.container);
  }
}
