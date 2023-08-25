import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductInformationView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div");
  }

  render() {
    return this.element;
  }
}
