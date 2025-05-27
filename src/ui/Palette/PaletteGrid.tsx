import { ColorBox } from "../ColorBox/ColorBox";

export const PaletteLevels = () => {
	return (
		<div className="w-full flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 auto-rows-fr">
			{colors.map((color) => {
				return <ColorBox showMore onShowMore={handleShowPalette} showCopy color={color} key={color.id} />;
			})}
		</div>
	);
};
