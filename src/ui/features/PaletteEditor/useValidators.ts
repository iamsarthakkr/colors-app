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

export const useValidators = (colors: IBaseColor[], editingColor?: IBaseColor, paletteId?: string): IPaletteValidators => {
	const { palettes } = useAppContext();

	const colorNameValidator = React.useCallback(
		(name: string) => {
			if (name.trim() === "") {
				return "Name can't be empty!";
			}
			const hasColor = colors.some(color => {
				const nameId = getId(name),
					colorId = getId(color.name),
					editingId = getId(editingColor?.name || '');
				if (editingId === colorId) return false;
				return colorId == nameId;
			});
			if (hasColor) {
				return "Color already in palette";
			}
			return "";
		},
		[colors, editingColor?.name]
	);

	const colorValidator = React.useCallback(
		(colorStr: string) => {
			if (colorStr.trim() === "") {
				return "Color has to be valid!";
			}
			const hasColor = colors.some((color) => {
				const nameId = getId(colorStr),
					colorId = getId(color.color),
					editingId = getId(editingColor?.color || "");
				if (editingId === colorId) return false;
				return colorId == nameId;
			});
			if (hasColor) {
				return "Color already in palette";
			}
			return "";
		},
		[colors, editingColor?.color]
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
