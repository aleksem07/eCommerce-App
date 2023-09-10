import fetchMock from "fetch-mock";
import CartService from "./cart";
import { LineItem } from "./cart.types";
import { Cart as CartTestData } from "@commercetools-test-data/cart";
import { LineItem as LineItemTestData } from "@commercetools-test-data/line-item";
import { Cart as CartResponse, LineItem as LineItemResponse } from "@commercetools/platform-sdk";
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
      const usernameMock = "username-id";
      localStorage.setItem(USERNAME_ID_LS, usernameMock);
      const userCartMock = mockUserCart(usernameMock);
      mockCartById(userCartMock.id);
      mockAddToCart(userCartMock.id, "productId");
      const instance = new CartService();

      const cart = await instance.addToCart("productId");

      expect(cart?.lineItems).toHaveLength(1);
      expect(cart?.lineItems).toContainEqual<LineItem>({
        productId: "productId",
        quantity: expect.any(Number),
        id: expect.any(String),
      });
    });
  });
});

function mockUserCart(usernameMock: string) {
  const cartMock = CartTestData.random().buildRest<CartResponse>();
  fetchMock.get(`${apiURL}/${projectKey}/carts/customer-id=${usernameMock}`, {
    status: 200,
    body: cartMock,
  });

  return cartMock;
}

function mockCartById(cartId: string) {
  const cartMock = CartTestData.random().buildRest<CartResponse>();
  fetchMock.get(`${apiURL}/${projectKey}/carts/${cartId}`, {
    status: 200,
    body: cartMock,
  });

  return cartMock;
}

function mockAddToCart(cartId: string, productId: string) {
  const lineItem = LineItemTestData.random().productId(productId);
  const cartMock = CartTestData.random().lineItems([lineItem]).buildRest<CartResponse>();
  fetchMock.post(`${apiURL}/${projectKey}/carts/${cartId}`, {
    status: 201,
    body: cartMock,
  });

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
