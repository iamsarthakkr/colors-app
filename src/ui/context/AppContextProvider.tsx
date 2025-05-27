"use client";

import React from "react";
import seedColors from "@/utils/seedColors.json";
import { IBasePalette } from "@/types/palette";
import { colorEnricher, paletteEnricher } from "@/utils/color";
import { AppContext, AppContextActions, IAppContext, IAppContextActions } from "./appContext";
import { getId } from "@/utils/palette";

interface IProps {
	children: React.ReactElement;
}

export const AppContextProvider: React.FC<IProps> = (props) => {
	const [palettes, setPalettes] = React.useState<IBasePalette[]>(seedColors);

	const getPalette: IAppContextActions["getPalette"] = React.useCallback(
		(id) => {
			return palettes.find((palette) => palette.id === id) || null;
		},
		[palettes]
	);

	const getEnrichedPalette: IAppContextActions["getEnrichedPalette"] = React.useCallback(
		(id) => {
			const palette = getPalette(id);
			if (palette) {
				return paletteEnricher(palette);
			}
			return null;
		},
		[getPalette]
	);

	const getColor: IAppContextActions["getColor"] = React.useCallback(
		(paletteId, colorId) => {
			return palettes.find((palette) => palette.id === paletteId)?.colors.find((c) => c.id === colorId) || null;
		},
		[palettes]
	);

	const getEnrichedColor: IAppContextActions["getEnrichedColor"] = React.useCallback(
		(paletteId, colorId) => {
			const color = getColor(paletteId, colorId);
			return color ? colorEnricher(color) : null;
		},
		[getColor]
	);
	const addPalette: IAppContextActions["addPalette"] = React.useCallback((paletteName, emoji, colors) => {
		const newPalette: IBasePalette = {
			paletteName,
			emoji,
			colors,
			id: getId(paletteName),
		};
		setPalettes((prev) => {
			return prev.concat(newPalette);
		});
	}, []);

	const context: IAppContext = React.useMemo(() => {
		return {
			palettes,
		};
	}, [palettes]);

	const contextActions: IAppContextActions = React.useMemo(() => {
		return {
			getPalette,
			getEnrichedPalette,
			getColor,
			getEnrichedColor,
			addPalette,
		};
	}, [getPalette, getEnrichedPalette, getColor, getEnrichedColor, addPalette]);

	return (
		<AppContext.Provider value={context}>
			<AppContextActions.Provider value={contextActions}>{props.children}</AppContextActions.Provider>
		</AppContext.Provider>
	);
};
