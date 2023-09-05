import { Events, EventCallback, EventData } from "./event-bus.types";

export class EventBusService {
  private static instance: EventBusService;
  private events: { [event: string]: EventCallback[] } = {};

  constructor() {
    this.events = {};
  }

  static getInstance(): EventBusService {
    if (!EventBusService.instance) {
      EventBusService.instance = new EventBusService();
    }

    return EventBusService.instance;
  }

  subscribe(event: Events, callback: EventCallback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    const eventCallback = this.events[event];
    eventCallback.push(callback);
  }

  publish(event: Events, data?: EventData) {
    const eventCallback = this.events[event];

    if (eventCallback) {
      eventCallback.forEach((callback) => callback(data));
    }
  }

  unsubscribe(event: Events, callback: EventCallback) {
    const eventCallback = this.events[event];

    if (eventCallback) {
      this.events[event] = eventCallback.filter((cb) => {
        return cb !== callback;
      });
    }
  }
}

const eventBusService = EventBusService.getInstance();

export default eventBusService;
