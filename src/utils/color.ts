import chroma from "chroma-js";
import { IBasePalette, IPalette, IColor, IBaseColor } from "@/types/palette";

// Default shades
export const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export const formats = ["hex", "rgb", "rgba"];

export const paletteEnricher = (basePalette: IBasePalette): IPalette => {
	const palette: IPalette = {
		...basePalette,
		colors: [],
	};

	for (const color of basePalette.colors) {
		palette.colors.push(colorEnricher(color));
	}

	return palette;
};

export const colorEnricher = (color: IBaseColor, toGenerate: number[] = shades): IColor => {
	const low = chroma(color.color).brighten(2);
	const hi = chroma(color.color).darken(2);

	const scale = chroma.scale([low, color.color, hi]).mode("lrgb").domain(toGenerate);

	const palette: IColor = {
		...color,
		shades: [],
	};

	for (const shade of toGenerate) {
		const colorName = `${color.name} ${shade}`;
		const colorShade = scale(shade);
		palette.shades.push({
			name: colorName,
			color: colorShade.hex(),
			weight: shade,
			id: colorName.toLocaleLowerCase().replaceAll(" ", "-"),
		});
	}

	return palette;
};

export const isDark = (color: string): boolean => {
	return chroma(color).luminance() < 0.15;
};

export const getCopyString = (color: string, format: string) => {
	if (formats.includes(format)) {
		const chromaStr = chroma(color);
		switch (format) {
			case "hex":
				return color;
			case "rgb":
				return chromaStr.css("rgb");
			case "rgba":
				return chromaStr.css().replace(")", " / 100)");
			default:
				return color;
		}
	}
	return color;
};
