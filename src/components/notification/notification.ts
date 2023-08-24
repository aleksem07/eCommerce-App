import NotificationView from "./notification.view";

export default class NotificationComponent {
  private view: NotificationView;

  constructor() {
    this.view = new NotificationView();
  }

  init() {
    return this.view.render();
  }
}
