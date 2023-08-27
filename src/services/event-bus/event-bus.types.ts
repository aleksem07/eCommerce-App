export enum Events {
  userLogin = "userLogin",
  userRegistered = "userRegistered",
  loginLinkClicked = "loginLinkClicked",
  logoutLinkClicked = "logoutLinkClicked",
  errorOccurred = "errorOccurred",
  fetchProductsSuccessfully = "fetchProductsSuccessfully",
  showNotification = "showNotification",
}

export type EventCallback = (data?: EventData) => void;

export type EventData = Record<string, unknown>;
