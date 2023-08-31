export enum Events {
  userLogin = "userLogin",
  userRegistered = "userRegistered",
  loginLinkClicked = "loginLinkClicked",
  logoutLinkClicked = "logoutLinkClicked",
  showNotification = "showNotification",
  showModal = "showModal",
  urlChanged = "urlChanged",
  renderProductSlider = "renderProductSlider",
}

export type EventCallback = (data?: EventData) => void;

export type EventData = Record<string, unknown>;
