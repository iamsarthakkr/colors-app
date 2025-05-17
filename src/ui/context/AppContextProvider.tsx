"use client";

import React from "react";
import seedColors from "@/utils/seedColors.json";
import { IPalette } from "@/types/palette";
import { generatePalette } from "@/utils/color";
import { AppContext, AppContextActions, IAppContext, IAppContextActions } from "./appContext";
interface IProps {
	children: React.ReactElement;
}

export const AppContextProvider: React.FC<IProps> = (props) => {
	const [palettes, _setPalettes] = React.useState<IPalette[]>(() => {
		return seedColors.map((base) => generatePalette(base));
	});

	const getPalette: IAppContextActions["getPalette"] = React.useCallback(
		(id) => {
			const palette = palettes.find((palette) => palette.id === id);
			return palette || null;
		},
		[palettes]
	);

	const getColor: IAppContextActions["getColor"] = React.useCallback(
		(paletteId, colorId) => {
			const palette = palettes.find((palette) => palette.id === paletteId);
			if (!palette) return null;
			const color = palette.colors.find((c) => c.id === colorId);
			return color || null;
		},
		[palettes]
	);

	const context: IAppContext = React.useMemo(() => {
		return {
			palettes,
		};
	}, [palettes]);

	const contextActions: IAppContextActions = React.useMemo(() => {
		return {
			getPalette,
			getColor
		};
	}, [getPalette, getColor]);

	return (
		<AppContext.Provider value={context}>
			<AppContextActions.Provider value={contextActions}>{props.children}</AppContextActions.Provider>
		</AppContext.Provider>
	);
};
