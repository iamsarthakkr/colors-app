import chroma from "chroma-js"
import { IBasePalette, IPalette, IColor, IColorShade } from "@/types/palette";

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

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export const generateShades = (color: IColor, toGenerate: number[] = shades): IColorShade[] => {
	
	const low = chroma(color.color).brighten(2);
	const hi = chroma(color.color).darken(2);
	
	const scale = chroma.scale([low, color.color, hi]).mode("lrgb").domain(toGenerate);
	
	const shades: IColorShade[] = [];

	for(const shade of toGenerate) {
		const colorName = `${color.name} ${shade}`; 
		const colorShade = scale(shade);
		shades.push({
			name: colorName,
			color: color.color,
			weight: shade,
			id: colorName.toLocaleLowerCase().replaceAll(' ', '-'),
			hex: colorShade.hex(),
			rgb: colorShade.css(),
			rgba: colorShade.alpha(1).css()
		})
	}

	return shades;
};
