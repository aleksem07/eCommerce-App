import FormControlComponent from "@Components/form-control/form-control";
import UserInfoView from "./user-info.view";
import { Customer, CustomerInfo } from "@Services/customer/customer.types";
import CustomerService from "@Services/customer/customer";
import { UserInfoFormData } from "./user-info.types";
import ValidatorUtil from "@Utils/validator/validator";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { NotificationVariant } from "@Components/notification/notification.types";

export default class UserInfoComponent {
  private view: UserInfoView;
  private formName = "user-info";
  private firstNameInput!: FormControlComponent;
  private lastNameInput!: FormControlComponent;
  private emailInput!: FormControlComponent;
  private dateOfBirthInput!: FormControlComponent;
  private isEditMode = false;
  private customer: Customer;
  private customerService: CustomerService;
  private validator: ValidatorUtil;

  constructor(customer: Customer) {
    this.view = new UserInfoView();
    this.customerService = new CustomerService();
    this.validator = new ValidatorUtil();
    this.customer = customer;
    this.instantiateComponents();

    this.view.submitFormListener(this.submitFormHandler.bind(this));
    this.view.editButtonListener(this.editButtonHandler.bind(this));
  }

  private instantiateComponents() {
    this.firstNameInput = new FormControlComponent({
      formName: this.formName,
      inputName: "first-name",
      labelText: "First Name",
      placeholderText: "Enter your first name",
      value: this.customer?.firstName,
      disabled: !this.isEditMode,
    });
    this.lastNameInput = new FormControlComponent({
      formName: this.formName,
      inputName: "last-name",
      labelText: "Last Name",
      placeholderText: "Enter your last name",
      value: this.customer?.lastName,
      disabled: !this.isEditMode,
    });
    this.emailInput = new FormControlComponent({
      formName: this.formName,
      inputName: "email",
      labelText: "Email",
      placeholderText: "Enter your email",
      type: "email",
      value: this.customer?.email,
      disabled: !this.isEditMode,
    });
    this.dateOfBirthInput = new FormControlComponent({
      formName: this.formName,
      inputName: "date-of-birth",
      labelText: "Date of Birth",
      placeholderText: "Enter your date of birth",
      type: "date",
      value: this.customer?.dateOfBirth,
      disabled: !this.isEditMode,
    });
  }

  private mapInputValuesToCustomer(inputValues: UserInfoFormData): CustomerInfo {
    return {
      id: this.customer.id,
      firstName: inputValues.get("first-name") || this.customer.firstName,
      lastName: inputValues.get("last-name") || this.customer.lastName,
      email: inputValues.get("email") || this.customer.email,
      dateOfBirth: inputValues.get("date-of-birth") || this.customer.dateOfBirth,
      version: this.customer.version,
    };
  }

  async submitFormHandler(inputValues: UserInfoFormData) {
    const areValuesValid = [...inputValues.entries()].every(
      ([key, value]) => this.validator.validate(key, value)?.isValid
    );

    if (areValuesValid) {
      const info = this.mapInputValuesToCustomer(inputValues);
      const customer = await this.customerService.updateInfo(info);

      if (customer) {
        this.customer = customer;
        this.isEditMode = false;
        this.instantiateComponents();
        this.init();
      }
    } else {
      this.firstNameInput.validate();
      this.lastNameInput.validate();
      this.emailInput.validate();
      this.dateOfBirthInput.validate();

      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: "Invalid input values",
      });
    }
  }

  editButtonHandler() {
    this.isEditMode = true;
    this.instantiateComponents();
    this.init();
  }

  init() {
    return this.view.render({
      firstNameInput: this.firstNameInput.init(),
      lastNameInput: this.lastNameInput.init(),
      emailInput: this.emailInput.init(),
      dateOfBirthInput: this.dateOfBirthInput.init(),
      isEditMode: this.isEditMode,
    });
  }
}
