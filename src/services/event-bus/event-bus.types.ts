export enum Events {
  userLogin = "userLogin",
  userRegistered = "userRegistered",
  loginLinkClicked = "loginLinkClicked",
  logoutLinkClicked = "logoutLinkClicked",
  errorOccurred = "errorOccurred",
  dataProductReceived = "dataProductReceived",
}

export type EventCallback = (data?: EventData) => void;

export type EventData = Record<string, unknown>;
