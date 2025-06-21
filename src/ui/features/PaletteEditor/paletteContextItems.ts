import { IBaseColor } from "@/types/palette";
import { MenuItem } from "@/ui/components/ContextMenu";
import { ColorBoxContextItemsProvider } from "../ColorBox";

type ContextMenuArg = {
	onEditColor: (color: IBaseColor) => void;
};

export const usePaletteContextItems = (arg: ContextMenuArg): ColorBoxContextItemsProvider => {
	const { onEditColor } = arg;
	return (color) => {
		const items: MenuItem[] = [
			{
				name: "Edit Color",
				action: () => {
					if(!color) {
						return;
					}
					onEditColor(color);
				},
			},
		];
		return items;
	};
}; 
