import { IPalette } from "@/types/palette";
import { ColorBox } from "./ColorBox";

type Props = {
	palette: IPalette;
};

export const Palette = (props: Props) => {
	const { palette } = props;

	const colors = palette.colors.map((color) => {
		return <ColorBox color={color} key={color.name} />;
	});

	return (
		<main className="h-full w-full flex flex-col m-0 p-0">
			{/* header */}
			<header className="w-full h-[40px] flex justify-center items-center ">
				<h1 className="font-bold text-2xl text-cyan-700">{palette.paletteName}</h1>
			</header>
			{/* color boxes */}
			<div className="w-full flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 auto-rows-fr">{colors}</div>
		</main>
	);
};
