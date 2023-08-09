import { ViewBuilder } from "@Interfaces/view-builder";

export default class AppView extends ViewBuilder {
  element: HTMLDivElement;

  constructor() {
    super();
    this.element = this.createElement("div", {
      id: "root",
    }) as HTMLDivElement;
  }

  render() {
    document.body.append(this.element);
  }
}
