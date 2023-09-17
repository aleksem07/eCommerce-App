import OrderTotalComponent from "./order-total";
const totalPrice = { currencyCode: "USD", value: 100 };

describe("OrderTotalComponent", () => {
  it("should instantiate", () => {
    const instance = new OrderTotalComponent(totalPrice, 100);
    expect(instance).toBeInstanceOf(OrderTotalComponent);
  });
  it("should render the component with button 'Complete order'", () => {
    const instance = new OrderTotalComponent(totalPrice, 100);
    expect(instance.init().querySelector(".btn-primary")).toBeTruthy();
  });
});
