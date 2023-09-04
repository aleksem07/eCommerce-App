import UserInfoComponent from "@Components/user-info/user-info";
import UserDataView from "./user-data.view";
import UserPasswordComponent from "@Components/user-password/user-password";
import UserAddressComponent from "@Components/user-address/user-address";
import { Customer, CustomerInfo } from "@Services/customer/customer.types";
import { UserDataFormData } from "./user-data.types";
import CustomerService from "@Services/customer/customer";

export default class UserDataComponent {
  private view: UserDataView;
  private userInfo!: UserInfoComponent;
  private userPassword!: UserPasswordComponent;
  private userShippingAddress!: UserAddressComponent;
  private userBillingAddress?: UserAddressComponent;
  private formName = "user-data";
  private isEditMode = false;
  private customer: Customer;
  private customerService: CustomerService;

  constructor(customer: Customer) {
    this.customer = customer;
    this.view = new UserDataView();
    this.customerService = new CustomerService();

    this.instantiateComponents();

    this.view.submitFormListener(this.submitFormHandler.bind(this));
    this.view.editButtonListener(this.editButtonHandler.bind(this));
  }

  private instantiateComponents() {
    this.userInfo = new UserInfoComponent(this.formName, this.customer);
    this.userPassword = new UserPasswordComponent(this.formName);

    this.userShippingAddress = new UserAddressComponent({
      header: "Shipping Address",
      formName: this.formName,
      address: this.customer.shippingAddress,
    });

    if (this.customer.billingAddress) {
      this.userBillingAddress = new UserAddressComponent({
        header: "Billing Address",
        formName: this.formName,
        address: this.customer.billingAddress,
      });
    }
  }

  private mapInputValuesToCustomer(inputValues: UserDataFormData): CustomerInfo {
    return {
      id: this.customer.id,
      firstName: inputValues.get("first-name") || this.customer.firstName,
      lastName: inputValues.get("last-name") || this.customer.lastName,
      email: inputValues.get("email") || this.customer.email,
      dateOfBirth: inputValues.get("date-of-birth") || this.customer.dateOfBirth,
      version: this.customer.version,
    };
  }

  async submitFormHandler(inputValues: UserDataFormData) {
    const info = this.mapInputValuesToCustomer(inputValues);

    // TODO: check validation before server call
    await this.customerService.updateInfo(info);
    this.isEditMode = false;
    this.instantiateComponents();
    this.init();
  }

  editButtonHandler() {
    this.isEditMode = true;
    this.instantiateComponents();
    this.init();
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
      isEditMode: this.isEditMode,
    });
  }
}
