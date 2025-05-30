import seedColors from "@/data/colors.json";
import chroma from "chroma-js";
import fs from "fs";
import { IBaseColor } from "@/types/palette";
import { getId } from "../common";

enum Color {
	Gray = "Gray",
	Red = "Red",
	Pink = "Pink",
	Purple = "Purple",
	Violet = "Violet",
	Blue = "Blue",
	Cyan = "Cyan",
	Green = "Green",
	Yellow = "Yellow",
	Orange = "Orange",
}

const RANGES: Record<Color, number[][]> = {
	[Color.Red]: [
		[0, 19],
		[345.00001, 360],
	],
	[Color.Orange]: [[19.00001, 53]],
	[Color.Yellow]: [[53.00001, 80]],
	[Color.Green]: [[80.00001, 170]],
	[Color.Cyan]: [[170.00001, 190]],
	[Color.Blue]: [[190.00001, 265]],
	[Color.Violet]: [[265.00001, 280]],
	[Color.Purple]: [[280.00001, 300]],
	[Color.Pink]: [[300.00001, 354]],
	[Color.Gray]: [
		[-100000000, -0.000001],
		[360.0001, 100000000],
	],
};

const getColorFamily = (hue: number): Color => {
	for (const family of Object.values(Color)) {
		for (const arr of RANGES[family]) {
			const lo = arr[0],
				hi = arr[1];
			if (hue >= lo && hue <= hi) return family;
		}
	}
	return Color.Gray;
};

const getCentralValue = (hue: number): number => {
	for (const family of Object.values(Color)) {
		for (const arr of RANGES[family]) {
			const lo = arr[0],
				hi = arr[1];
			if (hue >= lo && hue <= hi) return lo + (hi - lo) / 2;
		}
	}
	return 0;
};

const getFilteredColors = (): IBaseColor[] => {
	return Object.entries(seedColors)
		.map(([color, name]) => {
			return { color, name, id: getId(name) };
		})
		.filter((color) => {
			const hsl = chroma(color.color).hsl();
			// return 1;
			return hsl[2] < 0.7 && hsl[2] > 0.3;
		});
};

const sorter = (a: IBaseColor, b: IBaseColor): number => {
	const color1 = chroma(a.color).hsl();
	const color2 = chroma(b.color).hsl();
	const c1 = getCentralValue(color1[0]),
		c2 = getCentralValue(color2[0]);

	return Math.abs(color1[0] - c1) * (1 - color1[1]) - Math.abs(color2[0] - c2) * (1 - color2[1]);
};

const getFamilies = () => {
	const filtered = getFilteredColors();
	const groupedColors: Record<Color, IBaseColor[]> = Object.values(Color).reduce((prev, color) => {
		prev[color] = [];
		return prev;
	}, {} as Record<Color, IBaseColor[]>);

	for (const color of filtered) {
		const family = getColorFamily(chroma(color.color).hsl()[0]);
		if (!groupedColors[family]) groupedColors[family] = [];
		groupedColors[family].push(color);
	}
	return groupedColors;
}

export const generateFamily = () => {
	const groupedColors = getFamilies();
	Object.values(groupedColors).map((group) => {
		group.sort(sorter);
	});

	fs.writeFileSync("src/data/seedColorsGrouped.json", JSON.stringify(groupedColors, null, 4), { encoding: "utf-8" });
};

export const generateSeedColors = () => {
	const groupedColors = getFamilies();
	const colorsArr: IBaseColor[] = [];
	Object.values(groupedColors).map((group) => {
		group.sort(sorter);
		colorsArr.push(...group);
	});

	fs.writeFileSync("src/data/seedColors.json", JSON.stringify(colorsArr, null, 4), { encoding: "utf-8" });
};
