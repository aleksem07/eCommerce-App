import { Events, EventCallback, EventContract } from "./event-bus.types";

export class EventBusService {
  private static instance: EventBusService;
  private events: { [event: string]: EventCallback<keyof EventContract>[] } = {};

  constructor() {
    this.events = {};
  }

  static getInstance(): EventBusService {
    if (!EventBusService.instance) {
      EventBusService.instance = new EventBusService();
    }

    return EventBusService.instance;
  }

  subscribe(event: Events, callback: EventCallback<keyof EventContract>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    const eventCallback = this.events[event];
    eventCallback.push(callback);
  }

  publish(event: Events, data?: keyof EventContract) {
    const eventCallback = this.events[event];

    if (eventCallback) {
      eventCallback.forEach((callback) => callback(data));
    }
  }
}

const eventBusService = EventBusService.getInstance();

export default eventBusService;
