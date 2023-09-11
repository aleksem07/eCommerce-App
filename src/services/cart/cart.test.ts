import fetchMock from "fetch-mock";
import CartService from "./cart";
import { ANON_CART_ID_LS, LineItem } from "./cart.types";
import { Cart as CartTestData } from "@commercetools-test-data/cart";
import { LineItem as LineItemTestData } from "@commercetools-test-data/line-item";
import { Cart as CartResponse } from "@commercetools/platform-sdk";
import { USERNAME_ID_LS } from "@Services/auth/auth.types";

jest.mock("@Services/auth/auth");
jest.mock("@Services/event-bus/event-bus");

const apiURL = process.env.API_URL || "";
const projectKey = process.env.PROJECT_KEY || "";

describe("CartService", () => {
  afterEach(() => {
    fetchMock.reset();
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should instantiate", () => {
    const instance = new CartService();
    expect(instance).toBeInstanceOf(CartService);
  });

  describe("should add to cart", () => {
    it("when user is logged in", async () => {
      const usernameMock = "mock-username-id";
      const productIdMock = "mock-product-id";
      const userCartMock = mockGetUserCart(usernameMock);
      mockGetCartById(userCartMock.id);
      mockAddProductToCart(userCartMock.id, productIdMock);
      localStorage.setItem(USERNAME_ID_LS, usernameMock);
      const instance = new CartService();

      const cart = await instance.addToCart(productIdMock);

      expect(cart?.lineItems).toHaveLength(1);
      expect(cart?.lineItems).toContainEqual<LineItem>({
        productId: productIdMock,
        quantity: expect.any(Number),
        id: expect.any(String),
      });
    });

    it("when user is not logged in", async () => {
      const productIdMock = "mock-product-id";
      const anonCardIdMock = "mock-anon-cart-id";
      localStorage.setItem(ANON_CART_ID_LS, anonCardIdMock);
      mockGetCartById(anonCardIdMock);
      mockAddProductToCart(anonCardIdMock, productIdMock);
      const instance = new CartService();

      const cart = await instance.addToCart(productIdMock);

      expect(cart?.lineItems).toHaveLength(1);
      expect(cart?.lineItems).toContainEqual<LineItem>({
        productId: productIdMock,
        quantity: expect.any(Number),
        id: expect.any(String),
      });
    });

    it("when user is not logged in and there is no cart", async () => {
      const productIdMock = "mock-product-id";
      const cartMock = mockCreateCart();
      mockGetCartById(cartMock.id);
      mockAddProductToCart(cartMock.id, productIdMock);
      const instance = new CartService();

      const cart = await instance.addToCart(productIdMock);

      expect(cart?.lineItems).toHaveLength(1);
      expect(cart?.lineItems).toContainEqual<LineItem>({
        productId: productIdMock,
        quantity: expect.any(Number),
        id: expect.any(String),
      });
    });
  });
});

function mockGetUserCart(usernameMock: string) {
  const cartMock = CartTestData.random().buildRest<CartResponse>();
  fetchMock.get(`${apiURL}/${projectKey}/carts/customer-id=${usernameMock}`, {
    status: 200,
    body: cartMock,
  });

  return cartMock;
}

function mockGetCartById(cartId: string) {
  const cartMock = CartTestData.random().id(cartId).buildRest<CartResponse>();
  fetchMock.get(`${apiURL}/${projectKey}/carts/${cartId}`, {
    status: 200,
    body: cartMock,
  });

  return cartMock;
}

function mockAddProductToCart(cartId: string, productId: string) {
  const lineItem = LineItemTestData.random().productId(productId);
  const cartMock = CartTestData.random().id(cartId).lineItems([lineItem]).buildRest<CartResponse>();
  fetchMock.post(
    {
      url: `${apiURL}/${projectKey}/carts/${cartId}`,
      body: {
        actions: [
          {
            action: "addLineItem",
            productId,
          },
        ],
      },
    },
    {
      status: 201,
      body: cartMock,
    },
    {
      matchPartialBody: true,
    }
  );

  return cartMock;
}

function mockCreateCart() {
  const cartMock = CartTestData.random().buildRest<CartResponse>();
  fetchMock.post(`${apiURL}/${projectKey}/carts`, {
    status: 201,
    body: cartMock,
  });

  return cartMock;
}
