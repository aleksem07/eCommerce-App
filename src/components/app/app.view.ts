import { ViewBuilder } from "@Interfaces/view-builder";

export default class AppView extends ViewBuilder {
  element: HTMLDivElement;

  constructor() {
    super();
    this.element = this.createElement<HTMLDivElement>("div", {
      id: "root",
    });
  }

  render() {
    document.body.append(this.element);
  }
}
