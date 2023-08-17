export enum Events {
  userLogin = "userLogin",
}

export type EventCallback<T> = (data?: T) => void;

export interface EventContract {
  [event: string]: unknown;
}
