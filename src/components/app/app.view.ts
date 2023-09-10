import { ViewBuilder } from "@Interfaces/view-builder";

export default class AppView extends ViewBuilder {
  element: HTMLDivElement;

  constructor() {
    super();
    this.element = this.createElement<HTMLDivElement>("div", {
      id: "root",
    });
    document.body.className = "d-flex flex-column min-vh-100";
  }

  render() {
    document.body.append(this.element);
  }
}
