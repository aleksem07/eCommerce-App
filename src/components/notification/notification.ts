import "./notification.scss";
import { Toast } from "bootstrap";
import NotificationView from "./notification.view";
import { NotificationVariant } from "./notification.types";

export default class NotificationComponent {
  private view: NotificationView;
  private toast!: HTMLDivElement;

  constructor() {
    this.view = new NotificationView();
  }

  hideToastListener() {
    this.toast.addEventListener("hidden.bs.toast", () => {
      this.toast.remove();
    });
  }

  init(variant: NotificationVariant, message: string) {
    this.toast = this.view.render(variant, message);
    document.body.appendChild(this.toast);
    Toast.getOrCreateInstance(this.toast).show();

    this.hideToastListener();
  }
}
