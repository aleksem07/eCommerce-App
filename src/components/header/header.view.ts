import { ViewBuilder } from "@Interfaces/view-builder";

export default class HeaderView extends ViewBuilder {
  element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div");
  }

  render() {
    this.appendTo("", this.element);
  }
}
