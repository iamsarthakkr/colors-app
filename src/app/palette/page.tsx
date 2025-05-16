import { Palette } from "@/ui/Palette/Palette";
import { seedColors } from "@/utils/seedColors";

const PalettePage = () => {
	return <Palette palette={seedColors[2]} />
};

export default PalettePage;
