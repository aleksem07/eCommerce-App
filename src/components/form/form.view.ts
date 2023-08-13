import { ViewBuilder } from "@Interfaces/view-builder";

export default class FormView extends ViewBuilder {
  private form: HTMLFormElement;
  private container: HTMLDivElement;
  private header: HTMLHeadingElement;
  private submitButton: HTMLButtonElement;
  constructor(name: string) {
    super();
    this.form = this.createElement("form", { id: `${name}-form` });
    this.container = this.createElement("div", { id: `${name}-container`, classes: ["container"] });
    this.header = this.createElement("h1", { id: `${name}-header` });
    this.header.textContent = `${name[0].toUpperCase()}${name.slice(1)}`;
    this.submitButton = this.createElement("button", {
      id: `${name}-submit-button`,
      classes: ["btn", "btn-primary"],
    });
    this.submitButton.setAttribute("type", "submit");
    this.submitButton.textContent = "Submit";
  }

  render() {
    this.form.append(this.header, this.submitButton);
    this.container.append(this.form);
    this.appendTo("#login-page", this.container);
  }
}
