export enum Events {
  userLogin = "userLogin",
}

export type EventCallback<T> = (data?: T) => void;
