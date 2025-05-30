import groupedColors from "@/data/seedColorsGrouped.json";
import { ColorBox } from "@/ui/features/ColorBox";
import chroma from "chroma-js";

const TestGroup = async () => {
	console.log({ groupedColors });
	return (
		<div className="w-full h-full overflow-y-scroll flex flex-col gap-5">
			{Object.entries(groupedColors).map(([color, colors]) => {
				const colorsArr = colors.map((color) => ({ ...color, hsl: chroma(color.color).hsl() }));
				console.log({ color, colorsArr });
				
				if(colors.length === 0) return null;
				return (
					<div key={color}>
						<h2 className="text-2xl text-cyan-700 p-6">{color}</h2>
						<div className="w-full h-full grid grid-cols-[repeat(auto-fill,200px)] grid-rows-[repeat(auto-fill,200px)] justify-center gap-4">
							{colors.map(({ color, name }, id) => {
								return <ColorBox className="!w-[200px] !h-[200px]" color={{ name: `${name} ${id}`, color, id: color }} key={color} />;
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TestGroup;
