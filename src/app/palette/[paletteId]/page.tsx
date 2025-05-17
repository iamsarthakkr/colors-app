import { RouteProps } from "@/types/routes";
import { Palette } from "@/ui/Palette/Palette";

type Params = {
	paletteId: string;
};

const PalettePage = async (props: RouteProps<Params>) => {
	const { paletteId } = await props.params;
	return <Palette paletteId={paletteId} />;
};

export default PalettePage;
