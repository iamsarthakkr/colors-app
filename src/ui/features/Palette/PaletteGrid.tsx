import { IBaseColor } from "@/types/palette";
import { ColorBox, ColorBoxProps } from "../ColorBox";

type PaletteGridProps = {
	colors: IBaseColor[];
	colorBoxProps: Partial<ColorBoxProps>;
	children?: React.ReactNode;
};

export const PaletteGrid = (props: PaletteGridProps) => {
	const { colors, colorBoxProps, children } = props;
	return (
		<div className="h-full w-full flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 auto-rows-[25%]">
			{colors.map((color) => {
				return <ColorBox {...colorBoxProps} color={color} key={color.id} />;
			})}
			{children}
		</div>
	);
};
