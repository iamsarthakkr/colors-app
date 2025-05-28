import seedColors from '@/data/colors.json';
import chroma from "chroma-js";
import fs from "fs";
import { IBaseColor } from '@/types/palette';
import { getId } from '../common';

export const generateSeedColors = () => {
	const colorsArr: IBaseColor[] = Object.entries(seedColors).map(([color, name]) => {
		return { color, name, id: getId(name) };
	}).filter(color => {
		const hsl = chroma(color.color).hsl();
		return hsl[1] > 0.5 && hsl[2] < 0.7 && hsl[2] > 0.3;
	}).sort((a, b) => {
		const color1 = chroma(a.color);
		const h1 = color1.hsl()[0];
		const l1 = color1.hsl()[1];
		const s1 = color1.hsl()[2];

		const color2 = chroma(b.color);
		const h2 = color2.hsl()[0];
		const l2 = color2.hsl()[1];
		const s2 = color2.hsl()[2];

		if (isNaN(h1)) return 1;
		if (isNaN(h2)) return -1;
		const h1i = Math.round(h1), h2i = Math.round(h2);
		if(h1i == h2i) {
			return s1 * l1 - s2 * l2;
		}
		return h1 - h2;
	});
	fs.writeFileSync("src/data/.seedColors.json", JSON.stringify(colorsArr, null, 4), { encoding: "utf-8" });
}
