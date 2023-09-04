import UserInfoComponent from "@Components/user-info/user-info";
import UserDataView from "./user-data.view";
import UserPasswordComponent from "@Components/user-password/user-password";
import UserAddressComponent from "@Components/user-address/user-address";
import { Customer } from "@Services/customer/customer.types";

export default class UserDataComponent {
  private view: UserDataView;
  private userInfo!: UserInfoComponent;
  private userPassword!: UserPasswordComponent;
  private userShippingAddress!: UserAddressComponent;
  private userBillingAddress?: UserAddressComponent;
  private customer: Customer;

  constructor(customer: Customer) {
    this.customer = customer;
    this.view = new UserDataView();

    this.instantiateComponents();
  }

  private instantiateComponents() {
    this.userInfo = new UserInfoComponent(this.customer);
    this.userPassword = new UserPasswordComponent();

    this.userShippingAddress = new UserAddressComponent({
      header: "Shipping Address",
      address: this.customer.shippingAddress,
    });

    if (this.customer.billingAddress) {
      this.userBillingAddress = new UserAddressComponent({
        header: "Billing Address",
        address: this.customer.billingAddress,
      });
    }
  }

  init() {
    const userShippingAddress = this.userShippingAddress.init();
    const userBillingAddress = this.userBillingAddress?.init();
    const userInfo = this.userInfo.init();
    const userPassword = this.userPassword.init();

    return this.view.render({
      userInfo,
      userPassword,
      userShippingAddress,
      userBillingAddress,
    });
  }
}
