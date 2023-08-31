import UserInfoComponent from "@Components/user-info/user-info";
import UserDataView from "./user-data.view";
import UserPasswordComponent from "@Components/user-password/user-password";
import UserAddressComponent from "@Components/user-address/user-address";

export default class UserDataComponent {
  private view: UserDataView;
  private userInfo: UserInfoComponent;
  private userPassword: UserPasswordComponent;
  private userShippingAddress: UserAddressComponent;
  private userBillingAddress: UserAddressComponent;

  constructor() {
    this.view = new UserDataView();
    this.userInfo = new UserInfoComponent();
    this.userPassword = new UserPasswordComponent();
    this.userShippingAddress = new UserAddressComponent();
    this.userBillingAddress = new UserAddressComponent();
  }

  init() {
    const userShippingAddress = this.userShippingAddress.init();
    const userBillingAddress = this.userBillingAddress.init();
    const userInfo = this.userInfo.init();
    const userPassword = this.userPassword.init();

    return this.view.render({ userInfo, userPassword, userShippingAddress, userBillingAddress });
  }
}
