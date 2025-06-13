"use client";

import React from "react";
import seedPalettes from "@/data/seedPalettes.json";
import { IBasePalette } from "@/types/palette";
import { colorEnricher, paletteEnricher } from "@/utils/colors";
import { AppContext, AppContextActions, IAppContext, IAppContextActions } from "./appContext";
import { EventServiceProvider } from "../components/EventService";
interface IProps {
	children: React.ReactElement;
}

const savePalettes = (palettes: IBasePalette[]) => {
	if (typeof window !== "undefined") {
		window.localStorage.setItem("savedPalettes", JSON.stringify(palettes));
	}
};

const getPalettes = () => {
	if (typeof window !== "undefined") {
		const savedStr = window.localStorage.getItem("savedPalettes");
		return savedStr ? (JSON.parse(savedStr) as IBasePalette[]) : seedPalettes;
	}
	return seedPalettes;
};


export const AppContextProvider: React.FC<IProps> = (props) => {
	const [palettes, setPalettes] = React.useState<IBasePalette[]>([]);
	const [loaded, setLoaded] = React.useState(false);

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

	const addPalette: IAppContextActions["addPalette"] = React.useCallback((newPalette) => {
		setPalettes((prev) => {
			return prev.concat(newPalette);
		});
	}, []);

	const updatePalette: IAppContextActions["updatePalette"] = React.useCallback((updatedPalette, paletteId) => {
		setPalettes((prev) => {
			return prev.map((palette) => (palette.id === paletteId ? updatedPalette : palette));
		});
	}, []);
	
	const removePalette: IAppContextActions["removePalette"] = React.useCallback((paletteId: string) => {
		setPalettes((prev) => {
			return prev.filter((palette) => palette.id !== paletteId);
		});
	}, []);

	React.useEffect(() => {
		setPalettes(getPalettes());
		setLoaded(true);
	}, []);
	
	React.useEffect(() => {
		savePalettes(palettes);
	}, [palettes]);

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
			updatePalette,
			removePalette,
		};
	}, [getPalette, getEnrichedPalette, getColor, getEnrichedColor, addPalette, updatePalette, removePalette]);

	return (
		<AppContext.Provider value={context}>
			<AppContextActions.Provider value={contextActions}>
				<EventServiceProvider>{loaded ? props.children : null}</EventServiceProvider>
			</AppContextActions.Provider>
		</AppContext.Provider>
	);
};
