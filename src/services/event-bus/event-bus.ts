import { Events, EventCallback } from "./event-bus.types";

export class EventBusService<T> {
  private events: { [event: string]: EventCallback<T>[] } = {};

  constructor() {
    this.events = {};
  }

  subscribe(event: Events, callback: EventCallback<T>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    const eventCallback = this.events[event];
    eventCallback.push(callback);
  }

  publish(event: Events, data?: T) {
    const eventCallback = this.events[event];

    if (eventCallback) {
      eventCallback.forEach((callback) => callback(data));
    }
  }
}

const eventBus = new EventBusService();

export default eventBus;
