
export type IEvent<M = unknown> = {
	type: string;
	message: M;
};

export type Unsubscribe = () => void;
export type Subscriber<M = unknown> = (event: IEvent<M>) => void;

export type IEventService = {
	subscribe<M = unknown>(eventType: string, eventCallback: Subscriber<M>): Unsubscribe;
	emit<M = unknown>(eventType: string, message: M): void;
};
