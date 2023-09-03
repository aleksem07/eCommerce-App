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
