import "./notification.scss";
import { Toast } from "bootstrap";
import NotificationView from "./notification.view";

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

  init(message: string) {
    this.toast = this.view.render(message);
    document.body.appendChild(this.toast);
    Toast.getOrCreateInstance(this.toast).show();

    this.hideToastListener();
  }
}
