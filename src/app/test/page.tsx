"use client";

import { IBaseColor } from "@/types/palette";
import { ColorBox } from "@/ui/features/ColorBox";
import chroma from "chroma-js";

const Test = () => {
	const colorArr: IBaseColor[] = [];
	let c = 0;
	for(let h = 0; h < 360; h++) {
		for(let l = 0.5; l <= 0.8; l += 0.05) {
				for(let s = 0.4; s <= 0.8; s += 0.05) {
				const color = chroma.hsl(h, s, l);
				colorArr.push({ name: c.toString(), color: color.hex(), id: color.hex() });
				c += 1;
			}
		}
	}
	return (
		<div className="h-full overflow-y-scroll w-full grid grid-cols-7 auto-rows-[15%]">
			{colorArr.map(({ color, name }, id) => {
				return <ColorBox color={{ name: `${name} ${id}`, color, id: color }} key={color} />;
			})}
		</div>
	);
};

export default Test;
