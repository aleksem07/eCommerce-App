import UserInfoComponent from "@Components/user-info/user-info";
import UserDataView from "./user-data.view";
import UserPasswordComponent from "@Components/user-password/user-password";
import UserAddressComponent from "@Components/user-address/user-address";
import { Customer } from "@Services/customer/customer.types";

export default class UserDataComponent {
  private view: UserDataView;
  private userInfo!: UserInfoComponent;
  private userPassword!: UserPasswordComponent;
  private userAddresses: UserAddressComponent[] = [];
  private customer: Customer;

  constructor(customer: Customer) {
    this.customer = customer;
    this.view = new UserDataView();

    this.instantiateComponents();
  }

  private instantiateComponents() {
    this.userInfo = new UserInfoComponent(this.customer);
    this.userPassword = new UserPasswordComponent(this.customer);

    this.userAddresses = this.customer.addresses.map((address) => {
      return new UserAddressComponent({
        address,
        header: address.name,
      });
    });
  }

  init() {
    const userAddresses = this.userAddresses.map((address) => address.init());
    const userInfo = this.userInfo.init();
    const userPassword = this.userPassword.init();

    return this.view.render({
      userInfo,
      userPassword,
      userAddresses,
    });
  }
}
