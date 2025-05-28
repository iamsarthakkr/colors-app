"use client";

import colors from "@/data/colors.json";
import { ColorBox } from "@/ui/features/ColorBox";
import chroma from "chroma-js";

const Test = () => {
	const colorsArr = Object.entries(colors).map(([color, name]) => {
		return { color, name };
	}).filter(color => {
		const hsl = chroma(color.color).hsl();
		return hsl[1] > 0.5 && hsl[2] < 0.7 && hsl[2] > 0.3;
	}).sort((a, b) => {
		const h1 = chroma(a.color).hsl()[0];
		const l1 = chroma(a.color).hsl()[1];
		const s1 = chroma(a.color).hsl()[2];


		const h2 = chroma(b.color).hsl()[0];
		const l2 = chroma(b.color).hsl()[1];
		const s2 = chroma(b.color).hsl()[2];

		if (isNaN(h1)) return 1;
		if (isNaN(h2)) return -1;
		const h1i = Math.round(h1), h2i = Math.round(h2);
		if(h1i == h2i) {
			return s1 * l1 - s2 * l2;
		}
		return h1 - h2;
	});

	return (
		<div className="h-full overflow-y-scroll w-full grid grid-cols-8 auto-rows-[12.5%]">
			{colorsArr.map(({ color, name }) => {
				return <ColorBox color={{ name, color, id: color }} key={color} />;
			})}
		</div>
	);
};

export default Test;
