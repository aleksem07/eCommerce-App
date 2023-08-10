import { ViewBuilder } from "@Interfaces/view-builder";

export default class MainView extends ViewBuilder {
  element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div");
    this.element.textContent = "MAIN PAGE";
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
