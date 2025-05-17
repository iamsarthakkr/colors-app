import React from "react";
import { IPalette } from "@/types/palette";

export type IAppContext = {
	palettes: IPalette[];
};

export type IAppContextActions = {
};

export const AppContext = React.createContext<IAppContext>(null as unknown as IAppContext);

export const AppContextActions = React.createContext<IAppContextActions>(null as unknown as IAppContextActions);
