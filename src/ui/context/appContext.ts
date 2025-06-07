import React from "react";
import { IBaseColor, IBasePalette, IColor, IPalette } from "@/types/palette";

export type IAppContext = {
	palettes: IBasePalette[];
};

export type IAppContextActions = {
	getPalette: (paletteId: string) => IBasePalette | null;
	getEnrichedPalette: (paletteId: string) => IPalette | null;
	getColor: (paletteId: string, colorId: string) => IBaseColor | null;
	getEnrichedColor: (paletteId: string, colorId: string) => IColor | null;
	addPalette: (paletteName: string, paletteEmoji: string, color: IBaseColor[]) => void;
	removePalette: (paletteId: string) => void;
};

export const AppContext = React.createContext<IAppContext>(null as unknown as IAppContext);

export const AppContextActions = React.createContext<IAppContextActions>(null as unknown as IAppContextActions);
