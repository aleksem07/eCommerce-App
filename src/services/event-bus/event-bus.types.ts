export enum Events {
  userLogin = "userLogin",
  userRegistered = "userRegistered",
  loginLinkClicked = "loginLinkClicked",
  logoutLinkClicked = "logoutLinkClicked",
}

export type EventCallback<T> = (data?: T) => void;

export type EventData = Record<string, unknown>;
