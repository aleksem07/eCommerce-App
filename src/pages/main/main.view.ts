import { ViewBuilder } from "@Interfaces/view-builder";
import MainNavComponent from "@Components/main-nav/main-nav";

export default class MainView extends ViewBuilder {
  container: HTMLElement;
  heading: HTMLHeadingElement;
  component: MainNavComponent;
  mainNavComponent: HTMLUListElement;
  constructor() {
    super();
    this.container = this.createElement("div", {
      id: "main",
      classes: ["container"],
    });
    this.heading = this.createElement("h1", {
      id: "main-heading",
      classes: ["h3", "mb-3", "fw-normal", "text-center", "py-5"],
    });
    this.heading.textContent = "Main Page";
    this.component = new MainNavComponent();
    this.mainNavComponent = this.component.init();

    this.container.append(this.heading, this.mainNavComponent);
  }

  render() {
    this.appendTo("#root", this.container);
  }
}
