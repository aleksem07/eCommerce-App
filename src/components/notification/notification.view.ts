import { ViewBuilder } from "@Interfaces/view-builder";
import { NotificationVariant } from "./notification.types";

export default class NotificationView extends ViewBuilder {
  private toast: HTMLDivElement;
  private wrapper: HTMLDivElement;
  private toastBodyDiv!: HTMLDivElement;
  private closeButton: HTMLButtonElement;

  constructor() {
    super();
    this.toast = this.createToast();
    this.wrapper = this.createDFlexDiv();
    this.toastBodyDiv = this.createToastBodyDiv();
    this.closeButton = this.createCloseButton();
  }

  createToast() {
    const toast = this.createElement<HTMLDivElement>("div", {
      classes: ["toast", "align-items-center", "border-0", "notification"],
    });
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");

    return toast;
  }

  createDFlexDiv() {
    const div = this.createElement<HTMLDivElement>("div", {
      classes: ["d-flex"],
    });

    return div;
  }

  createToastBodyDiv() {
    const div = this.createElement<HTMLDivElement>("div", {
      classes: ["toast-body"],
    });

    return div;
  }

  createCloseButton() {
    const button = this.createElement<HTMLButtonElement>("button", {
      classes: ["btn-close", "btn-close-white", "me-2", "m-auto"],
    });
    button.setAttribute("type", "button");
    button.setAttribute("data-bs-dismiss", "toast");
    button.setAttribute("aria-label", "Close");

    return button;
  }

  setVariant(variant: NotificationVariant): string {
    this.toast.classList.remove("text-bg-primary", "text-bg-danger", "text-bg-success");
    switch (variant) {
      case "success":
        return "text-bg-success";
      case "danger":
        return "text-bg-danger";
      default:
        return "text-bg-primary";
    }
  }

  render(variant: NotificationVariant, message: string) {
    this.wrapper.innerHTML = "";
    this.toastBodyDiv.textContent = message;
    this.wrapper.append(this.toastBodyDiv, this.closeButton);

    this.toast.classList.add(this.setVariant(variant));
    this.toast.appendChild(this.wrapper);

    return this.toast;
  }
}
