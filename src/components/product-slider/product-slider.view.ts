import { ViewBuilder } from "@Interfaces/view-builder";

export default class ProductSliderView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div");
  }

  render() {
    return this.element;
  }
}
