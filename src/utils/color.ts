import chroma from "chroma-js";
import { IBasePalette, IPalette, IColor, IBaseColor, IColorShade } from "@/types/palette";

// Default shades
export const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export const formats = ["hex", "rgb", "rgba"];

export const generatePalette = (basePalette: IBasePalette): IPalette => {
	const palette: IPalette = {
		...basePalette,
		colors: [],
	};

	for (const color of basePalette.colors) {
		palette.colors.push(generateShades(color));
	}

	return palette;
};

export const generateShades = (color: IBaseColor, toGenerate: number[] = shades): IColor => {
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
			weight: shade,
			id: colorName.toLocaleLowerCase().replaceAll(" ", "-"),
			hex: colorShade.hex(),
			rgb: colorShade.css(),
			rgba: colorShade.css().replace("rgb", "rgba").replace(")", " / 100)"),
		});
	}

	return palette;
};

export const getColor = (shade: IColorShade, format: string): IBaseColor => {
	let color = shade.hex;
	if (format in shade) {
		color = shade[format as keyof IColorShade] as string;
	}
	return {
		...shade,
		color,
	};
};
