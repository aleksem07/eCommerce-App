import { NotificationVariant } from "@Components/notification/notification.types";
import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { HttpErrorType } from "@commercetools/sdk-client-v2";
import {
  Customer as CustomerResponse,
  Address as AddressResponse,
  CustomerUpdate,
  CustomerSetFirstNameAction,
  CustomerSetLastNameAction,
  CustomerChangeEmailAction,
  CustomerSetDateOfBirthAction,
  CustomerChangePassword,
} from "@commercetools/platform-sdk";
import { Address, Customer, CustomerInfo, CustomerPassword } from "./customer.types";

export default class CustomerService extends ClientBuilderService {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  async getUserInfo() {
    try {
      const token = await this.authService.retrieveToken();

      if (token) {
        const { body } = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .me()
          .get({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .execute();

        return this.mapCustomerResponseToCustomer(body);
      }
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
    }
  }

  private mapCustomerResponseToCustomer(customerResponse: CustomerResponse): Customer {
    return {
      id: customerResponse.id,
      firstName: customerResponse.firstName || "",
      lastName: customerResponse.lastName || "",
      email: customerResponse.email,
      dateOfBirth: customerResponse.dateOfBirth || "",
      version: customerResponse.version,
      addresses: this.getAddresses(customerResponse),
    };
  }

  private getAddresses(customerResponse: CustomerResponse): Address[] {
    return (
      customerResponse.addresses
        .map((address) => this.mapAddressResponseToAddress(address, customerResponse))
        .filter((address): address is Address => !!address) || []
    );
  }

  private mapAddressResponseToAddress(
    addressResponse: AddressResponse,
    customerResponse: CustomerResponse
  ): Address | undefined {
    const addressId = addressResponse.id;

    if (!addressId) {
      return;
    }

    const isShippingAddress = Boolean(customerResponse.shippingAddressIds?.includes(addressId));
    const isBillingAddress = Boolean(customerResponse.billingAddressIds?.includes(addressId));
    const isDefaultShippingAddress = customerResponse.defaultBillingAddressId === addressId;
    const isDefaultBillingAddress = customerResponse.defaultBillingAddressId === addressId;

    const isDefaultAddress =
      (isShippingAddress && isDefaultShippingAddress) ||
      (isBillingAddress && isDefaultBillingAddress);

    const name = [
      addressResponse.country,
      addressResponse.city,
      addressResponse.streetName,
      addressResponse.postalCode,
    ]
      .filter(Boolean)
      .join(", ");

    return {
      country: addressResponse?.country || "",
      city: addressResponse?.city || "",
      streetName: addressResponse?.streetName || "",
      postalCode: addressResponse?.postalCode || "",
      isDefaultAddress,
      isBillingAddress,
      isShippingAddress,
      name,
    };
  }

  async updateInfo(customerInfo: CustomerInfo): Promise<Customer | undefined> {
    const token = await this.authService.retrieveToken();
    const updateActions = this.updateCustomerInfo(customerInfo);

    try {
      const { body } = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .customers()
        .withId({ ID: customerInfo.id })
        .post({
          body: updateActions,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .execute();

      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.success,
        message: "Saved successfully",
      });

      return this.mapCustomerResponseToCustomer(body);
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
    }
  }

  private updateCustomerInfo(customer: CustomerInfo): CustomerUpdate {
    const setFirstNameAction: CustomerSetFirstNameAction = {
      firstName: customer.firstName,
      action: "setFirstName",
    };

    const setLastNameAction: CustomerSetLastNameAction = {
      lastName: customer.lastName,
      action: "setLastName",
    };

    const setEmailAction: CustomerChangeEmailAction = {
      email: customer.email,
      action: "changeEmail",
    };

    const setDateOfBirthAction: CustomerSetDateOfBirthAction = {
      dateOfBirth: customer.dateOfBirth,
      action: "setDateOfBirth",
    };

    return {
      version: customer.version,
      actions: [setFirstNameAction, setLastNameAction, setEmailAction, setDateOfBirthAction],
    };
  }

  async updatePassword(
    customer: CustomerPassword,
    currentPassword: string,
    newPassword: string
  ): Promise<Customer | undefined> {
    const token = await this.authService.retrieveToken();
    const passwordData = this.updateCustomerPassword(customer, currentPassword, newPassword);

    try {
      const { body } = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .customers()
        .password()
        .post({
          body: passwordData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .execute();

      if (body) {
        this.authService.signIn(body.email, newPassword);
      }

      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.success,
        message: "Password changed successfully",
      });

      return this.mapCustomerResponseToCustomer(body);
    } catch (error) {
      const httpError = error as HttpErrorType;
      eventBusService.publish(Events.showNotification, {
        variant: NotificationVariant.danger,
        message: httpError.message,
      });
    }
  }

  private updateCustomerPassword(
    customer: CustomerPassword,
    currentPassword: string,
    newPassword: string
  ): CustomerChangePassword {
    return {
      id: customer.id,
      currentPassword,
      newPassword,
      version: customer.version,
    };
  }
}
