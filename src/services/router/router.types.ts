export interface Route {
  init: (...args: unknown[]) => void;
}

export enum Routes {
  MAIN = "main",
  LOGIN = "login",
  REGISTRATION = "registration",
  NOT_FOUND = "404",
}
