import { IBasePalette, IPalette } from "@/types/palette";
import seedColors from "./seedColors.json";
import fs from "fs";
import path from "path";

export const formattSeeds = () => {
	const formatted: IBasePalette[] = seedColors.map((base) => {
		const palette: IBasePalette = {
			paletteName: base.paletteName,
			id: base.id,
			emoji: base.emoji,
			colors: base.colors.map((color) => {
				return {
					...color,
					id: color.name.toLocaleLowerCase(),
				};
			}),
		};
		return palette;
	});

	fs.writeFileSync("src/utils/.seedColors.json", JSON.stringify(formatted, null, 4), { encoding: "utf-8" });
};
