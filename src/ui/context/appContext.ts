import React from "react";
import { IColor, IPalette } from "@/types/palette";

export type IAppContext = {
	palettes: IPalette[];
};

export type IAppContextActions = {
	getPalette: (paletteId: string) => IPalette | null;
	getColor: (paletteId: string, colorId: string) => IColor | null;
};

export const AppContext = React.createContext<IAppContext>(null as unknown as IAppContext);

export const AppContextActions = React.createContext<IAppContextActions>(null as unknown as IAppContextActions);
