import { ViewBuilder } from "@Interfaces/view-builder";

export default class AppView extends ViewBuilder {
  element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      id: "root",
    });
  }

  render() {
    document.body.append(this.element);
  }
}
