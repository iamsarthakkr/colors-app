import { RouteProps } from "@/types/routes";
import { PaletteEditor } from "@/ui/features/PaletteEditor";

type Params = {
	paletteId: string;
};

const PalettePage = async (props: RouteProps<Params>) => {
	const { paletteId } = await props.params;
	return <PaletteEditor paletteId={paletteId} />;
};

export default PalettePage;
