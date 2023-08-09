import { EventTypes } from "types/event.enum";

type EventCallback<T> = (data?: T) => void;

class EventBus<T> {
  private subscriptions: Map<EventTypes, EventCallback<T>[]>;

  constructor() {
    this.subscriptions = new Map();
  }

  publish(eventType: EventTypes, data?: T) {
    const subscribers = this.subscriptions.get(eventType);

    if (subscribers) {
      subscribers.forEach((callback) => callback(data));
    }
  }

  subscribe(eventType: EventTypes, callback: EventCallback<T>) {
    const subscribers = this.subscriptions.get(eventType) || [];
    subscribers.push(callback);
    this.subscriptions.set(eventType, subscribers);
  }
}

const eventBus = new EventBus();

export default eventBus;
