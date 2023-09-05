import CustomerService from "./customer";
import fetchMock from "fetch-mock";
import { Customer as CustomerTestData } from "@commercetools-test-data/customer";
import { NotificationVariant } from "@Components/notification/notification.types";
import eventBusService from "@Services/event-bus/event-bus";
import { Events } from "@Services/event-bus/event-bus.types";
import {
  Customer as CustomerResponse,
  Address as AddressResponse,
} from "@commercetools/platform-sdk";
import { Address as AddressTestData } from "@commercetools-test-data/commons";
import { Address } from "./customer.types";

jest.mock("@Services/auth/auth");
jest.mock("@Services/event-bus/event-bus");

describe("CustomerService", () => {
  const apiURL = process.env.API_URL || "";
  const projectKey = process.env.PROJECT_KEY || "";

  afterEach(() => {
    fetchMock.reset();
  });

  it("should instantiate", () => {
    const instance = new CustomerService();
    expect(instance).toBeInstanceOf(CustomerService);
  });

  it("should return user info", async () => {
    const shippingAddressMock = AddressTestData.random().buildRest<AddressResponse>();
    const customerMock = CustomerTestData.random()
      .dateOfBirth("2000-01-01")
      .addresses([shippingAddressMock])
      .buildRest<CustomerResponse>();
    fetchMock.get(`${apiURL}/${projectKey}/me`, {
      status: 200,
      body: customerMock,
    });
    const instance = new CustomerService();

    const customer = await instance.getUserInfo();

    expect(customer?.id).toBeTruthy();
    expect(customer?.firstName).toBeTruthy();
    expect(customer?.lastName).toBeTruthy();
    expect(customer?.email).toBeTruthy();
    expect(customer?.dateOfBirth).toBeTruthy();
  });

  it("should return shipping address as default address", async () => {
    const shippingAddressMock = AddressTestData.random().buildRest<AddressResponse>();
    const customerMock = CustomerTestData.random()
      .dateOfBirth("2000-01-01")
      .addresses([shippingAddressMock])
      .shippingAddressIds([String(shippingAddressMock.id)])
      .defaultShippingAddressId(String(shippingAddressMock.id))
      .buildRest<CustomerResponse>();
    fetchMock.get(`${apiURL}/${projectKey}/me`, {
      status: 200,
      body: customerMock,
    });
    const instance = new CustomerService();

    const customer = await instance.getUserInfo();

    expect(customer?.addresses[0]).toEqual<Address>({
      city: String(shippingAddressMock.city),
      country: String(shippingAddressMock.country),
      postalCode: String(shippingAddressMock.postalCode),
      streetName: String(shippingAddressMock.streetName),
      isDefaultAddress: true,
      isShippingAddress: true,
      isBillingAddress: false,
      name: expect.any(String),
    });
  });

  it("should return billing address", async () => {
    const billingAddressMock = AddressTestData.random().buildRest<AddressResponse>();
    const customerMock = CustomerTestData.random()
      .dateOfBirth("2000-01-01")
      .addresses([billingAddressMock])
      .billingAddressIds([String(billingAddressMock.id)])
      .buildRest<CustomerResponse>();
    fetchMock.get(`${apiURL}/${projectKey}/me`, {
      status: 200,
      body: customerMock,
    });
    const instance = new CustomerService();

    const customer = await instance.getUserInfo();

    expect(customer?.addresses[0]).toEqual<Address>({
      city: String(billingAddressMock.city),
      country: String(billingAddressMock.country),
      postalCode: String(billingAddressMock.postalCode),
      streetName: String(billingAddressMock.streetName),
      isDefaultAddress: false,
      isShippingAddress: false,
      isBillingAddress: true,
      name: expect.any(String),
    });
  });

  it("should return shipping and billing address when they are different", async () => {
    const billingAddressMock = AddressTestData.random().buildRest<AddressResponse>();
    const shippingAddressMock = AddressTestData.random().buildRest<AddressResponse>();
    const customerMock = CustomerTestData.random()
      .dateOfBirth("2000-01-01")
      .addresses([billingAddressMock, shippingAddressMock])
      .billingAddressIds([String(billingAddressMock.id)])
      .shippingAddressIds([String(shippingAddressMock.id)])
      .defaultShippingAddressId(String(shippingAddressMock.id))
      .buildRest<CustomerResponse>();
    fetchMock.get(`${apiURL}/${projectKey}/me`, {
      status: 200,
      body: customerMock,
    });
    const instance = new CustomerService();

    const customer = await instance.getUserInfo();

    const [billingAddress, shippingAddress] = customer?.addresses || [];

    expect(billingAddress).toEqual<Address>({
      city: String(billingAddressMock.city),
      country: String(billingAddressMock.country),
      postalCode: String(billingAddressMock.postalCode),
      streetName: String(billingAddressMock.streetName),
      isDefaultAddress: false,
      isShippingAddress: false,
      isBillingAddress: true,
      name: expect.any(String),
    });
    expect(shippingAddress).toEqual<Address>({
      city: String(shippingAddressMock.city),
      country: String(shippingAddressMock.country),
      postalCode: String(shippingAddressMock.postalCode),
      streetName: String(shippingAddressMock.streetName),
      isDefaultAddress: true,
      isShippingAddress: true,
      isBillingAddress: false,
      name: expect.any(String),
    });
  });

  it("should return shipping address when addresses are the same", async () => {
    const addressMock = AddressTestData.random().buildRest<AddressResponse>();
    const customerMock = CustomerTestData.random()
      .dateOfBirth("2000-01-01")
      .addresses([addressMock])
      .billingAddressIds([String(addressMock.id)])
      .shippingAddressIds([String(addressMock.id)])
      .defaultShippingAddressId(String(addressMock.id))
      .buildRest<CustomerResponse>();
    fetchMock.get(`${apiURL}/${projectKey}/me`, {
      status: 200,
      body: customerMock,
    });
    const instance = new CustomerService();

    const customer = await instance.getUserInfo();

    expect(customer?.addresses[0]).toEqual<Address>({
      city: String(addressMock.city),
      country: String(addressMock.country),
      postalCode: String(addressMock.postalCode),
      streetName: String(addressMock.streetName),
      isDefaultAddress: true,
      isShippingAddress: true,
      isBillingAddress: true,
      name: expect.any(String),
    });
  });

  it("should publish show notification when error occurred", async () => {
    fetchMock.get(`${apiURL}/${projectKey}/me`, {
      status: 500,
      body: {
        name: "Network Error",
        message: "Network Error occurred",
      },
    });
    const instance = new CustomerService();

    await instance.getUserInfo();

    expect(eventBusService.publish).toHaveBeenCalledWith(Events.showNotification, {
      variant: NotificationVariant.danger,
      message: "Network Error occurred",
    });
  });
});
