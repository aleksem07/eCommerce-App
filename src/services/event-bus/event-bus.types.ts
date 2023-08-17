export enum Events {
  userLogin = "userLogin",
}

export type EventCallback<T> = (data?: T) => void;

export type EventData = Record<string, unknown>;
