import { EventBusService } from "./event-bus";
import { Events } from "./event-bus.types";

describe("EventBusService", () => {
  it("should instantiate", () => {
    const instance = new EventBusService();
    expect(instance).toBeInstanceOf(EventBusService);
  });
  it("should support multiple subscribers and publish events", () => {
    const eventBusService = EventBusService.getInstance();
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();
    eventBusService.subscribe(Events.userLogin, mockCallback1);
    eventBusService.subscribe(Events.userLogin, mockCallback2);
    eventBusService.publish(Events.userLogin, "user123");
    expect(mockCallback1).toHaveBeenCalledWith("user123");
    expect(mockCallback2).toHaveBeenCalledWith("user123");
  });
});
