export type UserDataFormData = Map<string, string>;

export interface UserDataElements {
  userInfo: HTMLElement;
  userPassword: HTMLElement;
  userShippingAddress: HTMLElement;
  userBillingAddress?: HTMLElement;
}
