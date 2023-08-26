export enum Events {
  userLogin = "userLogin",
  userRegistered = "userRegistered",
  loginLinkClicked = "loginLinkClicked",
  logoutLinkClicked = "logoutLinkClicked",
  errorOccurred = "errorOccurred",
  colorsReceived = "colorsReceived",
}

export type EventCallback = (data?: EventData) => void;

export type EventData = Record<string, unknown> | string[];
