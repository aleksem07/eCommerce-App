import { ViewBuilder } from "@Interfaces/view-builder";

export default class UserProfileView extends ViewBuilder {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement("div");
  }

  render() {
    this.appendTo("#root", this.element);
  }
}
