import { ViewBuilder } from "@Interfaces/view-builder";

export default class NotificationView extends ViewBuilder {
  private toast: HTMLDivElement;
  private dFlexDiv: HTMLDivElement;
  private toastBodyDiv!: HTMLDivElement;
  private closeButton: HTMLButtonElement;

  constructor() {
    super();
    this.toast = this.createToast();
    this.dFlexDiv = this.createDFlexDiv();
    this.toastBodyDiv = this.createToastBodyDiv();
    this.closeButton = this.createCloseButton();
  }

  createToast() {
    const toast = this.createElement<HTMLDivElement>("div", {
      classes: ["toast", "align-items-center", "text-bg-primary", "border-0", "notification"],
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

  render(message: string) {
    this.dFlexDiv.innerHTML = "";
    this.toastBodyDiv.textContent = message;
    this.dFlexDiv.append(this.toastBodyDiv, this.closeButton);
    this.toast.appendChild(this.dFlexDiv);

    return this.toast;
  }
}
