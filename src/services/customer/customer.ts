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
    return {
      id: customerResponse.id,
      firstName: customerResponse.firstName || "",
      lastName: customerResponse.lastName || "",
      email: customerResponse.email,
      dateOfBirth: customerResponse.dateOfBirth || "",
      shippingAddress: this.getShippingAddress(customerResponse),
      billingAddress: this.getBillingAddress(customerResponse),
    };
  }

  private getShippingAddress(customerResponse: CustomerResponse): Address {
    const shippingAddress = this.findAddressById(
      customerResponse.addresses,
      customerResponse.shippingAddressIds?.[0] || customerResponse.defaultShippingAddressId
    );
    const isShippingAddressDefault = this.findAddressById(
      customerResponse.addresses,
      customerResponse.defaultShippingAddressId
    );

    return this.mapAddressResponseToAddress(shippingAddress, !!isShippingAddressDefault);
  }

  private getBillingAddress(customerResponse: CustomerResponse): Address | undefined {
    const isBillingAddressEqualsShippingAddress =
      customerResponse.billingAddressIds?.some(
        (id) => customerResponse.shippingAddressIds?.includes(id)
      ) || false;
    const billingAddress = this.findAddressById(
      customerResponse.addresses,
      customerResponse.billingAddressIds?.[0] || customerResponse.defaultBillingAddressId
    );
    const isBillingAddressDefault = this.findAddressById(
      customerResponse.addresses,
      customerResponse.defaultBillingAddressId
    );

    if (billingAddress && !isBillingAddressEqualsShippingAddress) {
      return this.mapAddressResponseToAddress(billingAddress, !!isBillingAddressDefault);
    }
  }

  private mapAddressResponseToAddress(
    addressResponse?: AddressResponse,
    isDefaultAddress = false
  ): Address {
    return {
      country: addressResponse?.country || "",
      city: addressResponse?.city || "",
      streetName: addressResponse?.streetName || "",
      postalCode: addressResponse?.postalCode || "",
      isDefaultAddress,
    };
  }

  private findAddressById(addresses: AddressResponse[], addressId?: string) {
    return addresses.find((address) => address.id === addressId);
  }
}
