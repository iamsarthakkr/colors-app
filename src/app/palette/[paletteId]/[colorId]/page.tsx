import { RouteProps } from "@/types/routes";
import { ColorPalette } from "@/ui/ColorPalette";

type Params = {
	paletteId: string;
	colorId: string;
};

const ColorsPage = async (props: RouteProps<Params>) => {
	const { paletteId, colorId } = await props.params;
	return <ColorPalette paletteId={paletteId} colorId={colorId} />;
};

export default ColorsPage;
