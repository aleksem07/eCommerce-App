import FormControlComponent from "@Components/form-control/form-control";
import UserPasswordView from "./user-password.view";
import { UserPasswordFormData } from "./user-password.types";
import ValidatorUtil from "@Utils/validator/validator";
import { Customer, CustomerPassword } from "@Services/customer/customer.types";
import CustomerService from "@Services/customer/customer";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { NotificationVariant } from "@Components/notification/notification.types";

export default class UserPasswordComponent {
  private view: UserPasswordView;
  private newPasswordInput!: FormControlComponent;
  private confirmPasswordInput!: FormControlComponent;
  private formName = "user-password";
  private isEditMode = false;
  private validator: ValidatorUtil;
  private customer: Customer;
  private customerService: CustomerService;

  constructor(customer: Customer) {
    this.view = new UserPasswordView();
    this.validator = new ValidatorUtil();
    this.customerService = new CustomerService();
    this.customer = customer;
    this.instantiateComponents();
    this.view.submitFormListener(this.submitFormHandler.bind(this));
    this.view.editButtonListener(this.editButtonHandler.bind(this));
  }

  instantiateComponents() {
    this.newPasswordInput = new FormControlComponent({
      formName: this.formName,
      inputName: "new-password",
      labelText: "New Password",
      placeholderText: "Enter a new password",
      type: "password",
      disabled: !this.isEditMode,
    });

    this.confirmPasswordInput = new FormControlComponent({
      formName: this.formName,
      inputName: "confirm-password",
      labelText: "Confirm Password",
      placeholderText: "Confirm the new password",
      type: "password",
      disabled: !this.isEditMode,
    });
  }

  async submitFormHandler(inputValues: UserPasswordFormData) {
    const areValuesValid = [...inputValues.entries()].every(
      ([key, value]) => this.validator.validate(key, value)?.isValid
    );
    const newPassword = inputValues.get("new-password");
    const confirmPassword = inputValues.get("confirm-password");

    if (areValuesValid && newPassword === confirmPassword) {
      const customerPassword = this.mapInputValuesToPassword();

      if (newPassword) {
        await this.customerService.updatePassword(customerPassword, newPassword);
        this.isEditMode = false;
        this.instantiateComponents();
        this.init();
      }
    } else {
      this.newPasswordInput.validate();
      this.confirmPasswordInput.validate();

      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: "Invalid input values",
      });
    }
  }

  private mapInputValuesToPassword(): CustomerPassword {
    return {
      id: this.customer.id,
      password: this.customer.password,
      version: this.customer.version,
    };
  }

  private editButtonHandler() {
    this.isEditMode = true;
    this.instantiateComponents();
    this.init();
  }

  init() {
    const newPasswordInput = this.newPasswordInput.init();
    const confirmPasswordInput = this.confirmPasswordInput.init();

    return this.view.render({
      newPasswordInput,
      confirmPasswordInput,
      isEditMode: this.isEditMode,
    });
  }
}
