import { IBasePalette } from "@/types/palette";
import { MenuItem } from "@/ui/components/ContextMenu";
import { IAppContextActions } from "@/ui/context/appContext";
import React from "react";

type ContextMenuArg = {
	palette: IBasePalette;
	contextActionRef: React.RefObject<IAppContextActions>;
}

export const useMiniPaletteContextItems = (arg: ContextMenuArg): (() => MenuItem[]) => {
	const { palette, contextActionRef } = arg;
	return () => {
		const items: MenuItem[] = [
			{
				name: "Delete Palette",
				action: () => {
					contextActionRef.current.removePalette(palette.id);
				}
			},
		];
		return items;
	};
}; 
