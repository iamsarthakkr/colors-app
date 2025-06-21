"use client";

import React from "react";
import { IBaseColor } from "@/types/palette";
import { getId } from "@/utils/common";
import { useAppContext } from "@/ui/context/useContext";

type IValidator = (str: string) => string;

export type IPaletteValidators = {
	colorNameValidator: IValidator;
	colorValidator: IValidator;
	paletteNameValidator: IValidator;
};

export const useValidators = (colors: IBaseColor[], paletteId?: string): IPaletteValidators => {
	const { palettes } = useAppContext();

	const colorNameValidator = React.useCallback(
		(name: string) => {
			if (name.trim() === "") {
				return "Name can't be empty!";
			}
			if (colors.some((color) => getId(name) === color.id)) {
				return "Color already in palette";
			}
			return "";
		},
		[colors]
	);

	const colorValidator = React.useCallback(
		(colorStr: string) => {
			if (colorStr.trim() === "") {
				return "Color has to be valid!";
			}
			if (colors.some((color) => color.color.toLocaleLowerCase() === colorStr.toLocaleLowerCase())) {
				return "Color already in palette";
			}
			return "";
		},
		[colors]
	);

	const paletteNameValidator = React.useCallback(
		(paletteName: string) => {
			if (paletteName.trim() === "") {
				return "Palette name is required!";
			}
			if (palettes.some((palette) => getId(paletteName) === palette.id && paletteId !== palette.id)) {
				return "Palette with same name already present!";
			}
			return "";
		},
		[paletteId, palettes]
	);

	return { colorNameValidator, colorValidator, paletteNameValidator };
};
