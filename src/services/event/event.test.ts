import eventBus from "./event";

describe("EventService", () => {
  it("should instantiate", () => {
    const instance = eventBus;
    expect(instance).toBeInstanceOf(eventBus);
  });
});
