import { EventBusService } from "./event-bus";
import { Events } from "./event-bus.types";

describe("EventBusService", () => {
  it("should instantiate", () => {
    const instance = new EventBusService();
    expect(instance).toBeInstanceOf(EventBusService);
  });

  it("should subscribe and publish events", () => {
    const eventBus = new EventBusService();
    const mockCallback = jest.fn();
    eventBus.subscribe(Events.userLogin, mockCallback);
    eventBus.publish(Events.userLogin, "someData");
    expect(mockCallback).toHaveBeenCalledWith("someData");
  });
});
