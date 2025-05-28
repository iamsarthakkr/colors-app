import { IBasePalette } from "@/types/palette";
import seedPalettes from "@/data/seedPalettes.json";
import { getId } from "../common";
import fs from "fs";

export const generatePalettes = () => {
	const formatted: IBasePalette[] = seedPalettes.map((base) => {
		const palette: IBasePalette = {
			paletteName: base.paletteName,
			id: base.id,
			emoji: base.emoji,
			colors: base.colors.map((color) => {
				return {
					...color,
					id: getId(color.name),
				};
			}),
		};
		return palette;
	});

	fs.writeFileSync("src/data/.seedPalettes.json", JSON.stringify(formatted, null, 4), { encoding: "utf-8" });
};
