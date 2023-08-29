export enum Events {
  userLogin = "userLogin",
  userRegistered = "userRegistered",
  loginLinkClicked = "loginLinkClicked",
  logoutLinkClicked = "logoutLinkClicked",
  errorOccurred = "errorOccurred",
  fetchProductsSuccessfully = "fetchProductsSuccessfully",
  showNotification = "showNotification",
  resetFiltersClick = "resetFiltersClick",
  checkboxFilterClick = "checkboxFilterClick",
  colorFilterClick = "colorFilterClick",
}

export type EventCallback = (data?: EventData) => void;

export type EventData = Record<string, unknown>;
