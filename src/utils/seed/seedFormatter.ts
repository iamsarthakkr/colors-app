import { IBasePalette } from "@/types/palette";
import seedColors from "@/data/seedColors.json";
import { getId } from "../common";
import fs from "fs";

export const formattSeeds = () => {
	const formatted: IBasePalette[] = seedColors.map((base) => {
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

	fs.writeFileSync("src/data/.seedColors.json", JSON.stringify(formatted, null, 4), { encoding: "utf-8" });
};
