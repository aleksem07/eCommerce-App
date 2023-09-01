export enum Events {
  userLogin = "userLogin",
  userRegistered = "userRegistered",
  loginLinkClicked = "loginLinkClicked",
  logoutLinkClicked = "logoutLinkClicked",
  errorOccurred = "errorOccurred",
  fetchProductsSuccessfully = "fetchProductsSuccessfully",
  showNotification = "showNotification",
  resetFilters = "resetFilters",
  filterBySize = "checkboxFilterClick",
  filterByColor = "filterByColor",
  minPriceFilterValue = "minPriceFilterValue",
  maxPriceFilterValue = "maxPriceFilterValue",
  showModal = "showModal",
  urlChanged = "urlChanged",
  renderProductSlider = "renderProductSlider",
}

export type EventCallback = (data?: EventData) => void;

export type EventData = Record<string, unknown>;
