import { EventBusService } from "./event-bus";
import { Events } from "./event-bus.types";

describe("EventBusService", () => {
  it("should instantiate", () => {
    const instance = new EventBusService();
    expect(instance).toBeInstanceOf(EventBusService);
  });
  it("should support and publish events", () => {
    const eventBusService = EventBusService.getInstance();
    const mockCallback1 = jest.fn();
    eventBusService.subscribe(Events.userLogin, mockCallback1);

    const eventData = { username: "user123" };
    eventBusService.publish(Events.userLogin, eventData);

    expect(mockCallback1).toHaveBeenCalledWith(eventData);
  });
});
