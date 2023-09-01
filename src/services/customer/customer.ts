import { NotificationVariant } from "@Components/notification/notification.types";
import AuthService from "@Services/auth/auth";
import ClientBuilderService from "@Services/client-builder/client-builder";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import { HttpErrorType } from "@commercetools/sdk-client-v2";
import {
  Customer as CustomerResponse,
  Address as AddressResponse,
} from "@commercetools/platform-sdk";
import { Address, Customer } from "./customer.types";

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
    const customer: Customer = {
      id: customerResponse.id,
      firstName: customerResponse.firstName || "",
      lastName: customerResponse.lastName || "",
      email: customerResponse.email,
      dateOfBirth: customerResponse.dateOfBirth || "",
    } as Customer; //TODO: fix this
    this.handleCustomerAddresses(customerResponse, customer);

    return customer;
  }

  private handleCustomerAddresses(customerResponse: CustomerResponse, customer: Customer) {
    const isBillingAddressEqualToShippingAddress =
      customerResponse.defaultBillingAddressId === customerResponse.defaultShippingAddressId;

    if (isBillingAddressEqualToShippingAddress) {
      const address = this.findAddressById(
        customerResponse.addresses,
        customerResponse.shippingAddressIds?.[0] || customerResponse.defaultShippingAddressId
      );

      if (address) {
        customer.shippingAddress = this.mapAddressResponseToAddress(address);
      }
    } else {
      const billingAddress = this.findAddressById(
        customerResponse.addresses,
        customerResponse.billingAddressIds?.[0] || customerResponse.defaultBillingAddressId
      );

      if (billingAddress) {
        customer.billingAddress = this.mapAddressResponseToAddress(billingAddress);
      }

      const shippingAddress = this.findAddressById(
        customerResponse.addresses,
        customerResponse.shippingAddressIds?.[0] || customerResponse.defaultShippingAddressId
      );

      if (shippingAddress) {
        customer.shippingAddress = this.mapAddressResponseToAddress(shippingAddress);
      }
    }
  }

  private mapAddressResponseToAddress(addressResponse: AddressResponse): Address {
    return {
      country: addressResponse.country,
      city: addressResponse.city || "",
      streetName: addressResponse.streetName || "",
      postalCode: addressResponse.postalCode || "",
    };
  }

  private findAddressById(addresses: AddressResponse[], addressId?: string) {
    return addresses.find((address) => address.id === addressId);
  }
}
