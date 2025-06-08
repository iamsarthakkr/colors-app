import React from "react";
import { EventServiceContext } from "./eventServiceContext";

export const useEventService = () => {
	return React.useContext(EventServiceContext);
};
