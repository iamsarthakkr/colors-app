import React from "react";
import { EventServiceContext } from "./eventServiceContext";
import { IEventService } from "./types";
import { useEventService } from "./useEventService";
import { createEventService } from "./createEventService";

type Props = {
	children?: React.ReactNode;
};

export const EventServiceProvider = (props: Props) => {
	const eventService = useEventService();
	const eventServiceRef = React.useRef<IEventService | null>(eventService);

	React.useEffect(() => {
		if (!eventServiceRef.current) {
			eventServiceRef.current = createEventService();
		}
	}, []);

	if (eventServiceRef.current) {
		return <EventServiceContext.Provider value={eventServiceRef.current}>{props.children}</EventServiceContext.Provider>;
	}

	return <div data-test-id="event-service-initializing" />;
};
