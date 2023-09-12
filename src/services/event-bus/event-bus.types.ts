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
  searchProducts = "searchProducts",
  sortProducts = "sortProducts",
  pageSwitch = "pageSwitch",
  moveByCategory = "moveByCategory",
  getAllProductsInCategory = "getAllProductsInCategory",
  updateCart = "updateCart",
}

export type EventCallback = (data?: EventData) => void;

export type EventData = Record<string, unknown>;
