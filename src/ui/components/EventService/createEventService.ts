import { IEventService, Subscriber, Unsubscribe } from "./types";

export const createEventService = (): IEventService => {
	const subscriberMap = new Map<string, Subscriber<unknown>[]>();

	const subscribe = <M = unknown>(eventType: string, eventCallback: Subscriber<M>): Unsubscribe => {
		const subscribers = (subscriberMap.get(eventType) as Subscriber<M>[] | undefined) || [];
		subscribers.push(eventCallback);
		subscriberMap.set(eventType, subscribers as Subscriber<unknown>[]);

		return () => {
			const subscribers = (subscriberMap.get(eventType) as Subscriber<M>[] | undefined) || [];
			const idx = subscribers.findIndex((sub) => sub === eventCallback);
			if (idx >= 0) {
				subscribers.splice(idx, 1);
			}
			subscriberMap.set(eventType, subscribers as Subscriber<unknown>[]);
		};
	};

	const emit: IEventService["emit"] = (eventType, message) => {
		const subscribers = subscriberMap.get(eventType);
		if (subscribers) {
			subscribers.forEach((callback) => {
				callback({
					type: eventType,
					message,
				});
			});
		}
	};

	return {
		subscribe,
		emit,
	};
};
