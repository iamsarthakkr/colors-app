import React from "react";
import { IEventService } from "./types";

export const EventServiceContext = React.createContext<IEventService>(null as unknown as IEventService);
